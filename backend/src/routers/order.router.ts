import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import { OrderModel } from '../models/order.model';
import { OrderStatus } from '../constants/order_status';
import auth from '../middlewares/auth.mid';

const router = Router();
router.use(auth);

router.post('/create', asyncHandler(async (req: any, res: any) => {
    const requiredOrder = req.body;

    if (requiredOrder.items.length <= 0) {
        res.status(HTTP_BAD_REQUEST).send('Cart Is Empty');
        return;
    }

    await OrderModel.deleteOne({
        user: req.user.id,
        status: OrderStatus.NEW
    });

    const newOrder = new OrderModel({ ...requiredOrder, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);
}));

router.get('/newOrderForCurrentUser', asyncHandler(async (req: any, res) => {
    const order = await getNewOrderForCurrentUser(req);
    if (order) res.send(order);
    else res.status(HTTP_BAD_REQUEST).send();
}));

router.post('/pay', asyncHandler(async (req: any, res) => {
    const { paymentId } = req.body;
    const order = await getNewOrderForCurrentUser(req);
    if (!order) {
        res.status(HTTP_BAD_REQUEST).send('Order Not Found!');
        return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.send(order._id);
}));

router.get('/track/:id', asyncHandler(async (req, res) => {
    const order = await OrderModel.findById(req.params.id);
    res.send(order);
}));

// เพิ่ม Route นี้เพื่อดึงข้อมูลคำสั่งซื้อทั้งหมด
router.get('/', asyncHandler(async (req, res) => {
    try {
        const orders = await OrderModel.find(); // ดึงคำสั่งซื้อทั้งหมด
        res.send(orders); // ส่งกลับข้อมูลคำสั่งซื้อ
    } catch (error) {
        res.status(500).send('Server error'); // แจ้งเตือนถ้ามีข้อผิดพลาด
    }
}));

export default router;

async function getNewOrderForCurrentUser(req: any) {
    return await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });
}
