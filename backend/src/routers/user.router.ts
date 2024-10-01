import { Router } from 'express';
import { sample_users } from '../data';  // ต้องแน่ใจว่า sample_users ถูกเข้ารหัสรหัสผ่าน
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs';

const router = Router();

// Seed sample users
router.get("/seed", asyncHandler(
    async (req, res) => {
        const usersCount = await UserModel.countDocuments();
        if(usersCount > 0){
            res.send("Seed is already done!");
            return;
        }

        // ตรวจสอบว่า sample_users เข้ารหัสรหัสผ่านอย่างถูกต้อง
        try {
            const encryptedUsers = sample_users.map(user => ({
                ...user,
                password: bcrypt.hashSync(user.password, 10)  // เข้ารหัสรหัสผ่านของแต่ละผู้ใช้
            }));

            await UserModel.create(encryptedUsers);  // สร้างผู้ใช้จาก sample_users ที่เข้ารหัสแล้ว
            res.send("Seed Is Done!");
        } catch (error: any) {
            res.status(500).send("Error creating user: " + (error.message || error));
        }
    })
);

// Login Route
router.post("/login", asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });  // หาผู้ใช้ด้วยอีเมล

        if(user && await bcrypt.compare(password, user.password)) {  // ใช้ bcrypt เปรียบเทียบรหัสผ่าน
            res.send(generateTokenResponse(user));  // สร้าง token และส่งข้อมูลผู้ใช้กลับไป
        } else {          
            res.status(HTTP_BAD_REQUEST).send("Username or password is not valid!");
        }
    }
));

// Register Route
router.post('/register', asyncHandler(
    async (req, res) => {
        const { name, email, password, address } = req.body;
        const user = await UserModel.findOne({ email });
        if(user){
            res.status(HTTP_BAD_REQUEST)
            .send('User already exists, please login!');
            return;
        }

        try {
            const encryptedPassword = await bcrypt.hash(password, 10);  // เข้ารหัสรหัสผ่าน

            const newUser: User = {
                id: '',
                name,
                email: email.toLowerCase(),
                password: encryptedPassword,
                address,
                isAdmin: false  // ค่าเริ่มต้นของผู้ใช้ใหม่เป็น user ปกติ
            }

            const dbUser = await UserModel.create(newUser); 
            res.send(generateTokenResponse(dbUser));  // สร้าง token และส่งข้อมูลผู้ใช้กลับไป
        } catch (error: any) {
            res.status(500).send("Error creating user: " + (error.message || error));
        }
    }
));

// Function to generate token response
const generateTokenResponse = (user: User) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT secret is not defined. Check your .env file.");
    }
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin  // รวมข้อมูล isAdmin ลงใน token
    }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
    
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,  // ส่งข้อมูล isAdmin กลับไป
        token: token  // ส่ง token กลับไปยัง frontend
    };
}

export default router;
