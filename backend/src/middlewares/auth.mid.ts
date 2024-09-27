import { verify } from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../constants/http_status";

export default (req: any, res: any, next: any) => {
    // แก้ไขการเข้าถึง header ให้ถูกต้อง
    const token = req.headers['access_token'] as string;
    if (!token) return res.status(HTTP_UNAUTHORIZED).send("No token provided.");

    try {
        const decodedUser = verify(token, process.env.JWT_SECRET!);  // ใช้ ! เพื่อบอก TypeScript ว่าเรามั่นใจว่ามีค่า
        req.user = decodedUser;
    } catch (error) {
        // สามารถเพิ่มการแสดงข้อความผิดพลาดหรือ log ต่างๆ ได้ที่นี่
        return res.status(HTTP_UNAUTHORIZED).send("Invalid token.");
    }

    return next();
};
