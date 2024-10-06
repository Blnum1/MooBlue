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

// In your order.router.ts

router.get('/daily-sales-data', asyncHandler(async (req, res) => {
    try {
        const dailySalesData = await OrderModel.aggregate([
            {
                $match: { status: OrderStatus.PAYED } // Only consider paid orders
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group by day
                    totalRevenue: { $sum: "$totalPrice" } // Sum the totalPrice
                }
            },
            {
                $sort: { _id: 1 } // Sort by date
            }
        ]);
        
        // Define the type for the result object
        const result: { [key: string]: number } = {};
        dailySalesData.forEach(entry => {
            result[entry._id] = entry.totalRevenue; // Assign totalRevenue to the corresponding date
        });

        res.send(result);
    } catch (error) {
        res.status(500).send('Server error');
    }
}));


// In your order.router.ts

router.get('/top-tags', asyncHandler(async (req, res) => {
    try {
        const topTagsData = await OrderModel.aggregate([
            {
                $unwind: "$items" // แยกแต่ละ item ใน order
            },
            {
                $group: {
                    _id: "$items.pork.tags", // สมมุติว่า tags อยู่ใน pork
                    totalSold: { $sum: "$items.quantity" } // นับจำนวนขายรวม
                }
            },
            {
                $sort: { totalSold: -1 } // เรียงจากมากไปน้อย
            },
            {
                $limit: 10 // กำหนดจำนวน tags ที่จะแสดง (10 อันดับแรก)
            }
        ]);

        res.send(topTagsData);
    } catch (error) {
        res.status(500).send('Server error');
    }
}));










export default router;

async function getNewOrderForCurrentUser(req: any) {
    return await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });
}
