import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { HTTP_UNAUTHORIZED } from "../constants/http_status";

// สร้าง interface ที่กำหนดค่า user บน req
interface AuthenticatedRequest extends Request {
    user?: any;
}

export default (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];  // ตรวจสอบ token จาก header

    if (!token) {
        return res.status(HTTP_UNAUTHORIZED).send("No token provided.");
    }

    try {
        const decodedUser = verify(token, process.env.JWT_SECRET!) as { id: string };  // ตรวจสอบ token และกำหนดประเภท
        req.user = { id: decodedUser.id };  // เพิ่มข้อมูล user ลงใน req
    } catch (error) {
        return res.status(HTTP_UNAUTHORIZED).send("Invalid token.");
    }

    next();
};
