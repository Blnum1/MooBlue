import { Router, Request, Response } from 'express';
import authMiddleware from '../middlewares/auth.mid';  // นำเข้า middleware ตรวจสอบ token
import asyncHandler from 'express-async-handler';
import { UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';

const router = Router();

// กำหนด interface สำหรับ Request ที่ขยายเพื่อรวม user
interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
    };
}

// Profile Route ใช้ middleware เพื่อตรวจสอบ token
router.get('/profile', authMiddleware, asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;  // รับ userId จาก middleware
    if (!userId) {
        res.status(404).send('User not found');
        return;
    }

    const user = await UserModel.findById(userId);
    if (!user) {
        res.status(404).send('User not found');
        return;
    }

    res.json(user);  // ส่งข้อมูล user กลับไปที่ frontend
}));

// Seed sample users
router.get("/seed", asyncHandler(async (req, res) => {
    const usersCount = await UserModel.countDocuments();
    if (usersCount > 0) {
        res.send("Seed is already done!");
        return;
    }

    try {
        const encryptedUsers = sample_users.map(user => ({
            ...user,
            password: bcrypt.hashSync(user.password, 10)
        }));

        await UserModel.create(encryptedUsers);  // สร้างผู้ใช้จาก sample_users ที่เข้ารหัสแล้ว
        res.send("Seed Is Done!");
    } catch (error: any) {
        res.status(500).send("Error creating user: " + (error.message || error));
    }
}));

// Login Route
router.post("/login", asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
        res.send(generateTokenResponse(user));  // สร้าง token และส่งข้อมูลผู้ใช้กลับไป
    } else {
        res.status(HTTP_BAD_REQUEST).send("Username or password is not valid!");
    }
}));

// Register Route
router.post('/register', asyncHandler(async (req, res) => {
    const { name, email, password, address } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
        res.status(HTTP_BAD_REQUEST).send('User already exists, please login!');
        return;
    }

    try {
        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin: false
        });

        const dbUser = await newUser.save(); 
        res.send(generateTokenResponse(dbUser));  // สร้าง token และส่งข้อมูลผู้ใช้กลับไป
    } catch (error: any) {
        res.status(500).send("Error creating user: " + (error.message || error));
    }
}));

// ฟังก์ชันสร้าง Token
const generateTokenResponse = (user: any) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT secret is not defined. Check your .env file.");
    }
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin
    }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token
    };
}

export default router;
