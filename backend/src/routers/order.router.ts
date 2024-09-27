import {Router} from 'express';
import asyncHander from 'express-async-handler';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import { OrderModel } from '../models/order.model';
import { OrderStatus } from '../constants/order_status';
import auth from '../middlewares/auth.mid';

const router = Router();
router.use(auth);

router.post('/create',
    asyncHander(async (req:any, res:any) => {
        const requiredOrder = req.body;

        if(requiredOrder.items.length <= 0){
            res.status(HTTP_BAD_REQUEST).send('Cart Is Empty');
            return;
        }

        await OrderModel.deleteOne({
            user: req.user.id,
            status: OrderStatus.NEW
        });

        const newOrder = new OrderModel({...requiredOrder,user: req.user.id});
        await newOrder.save();
        res.send(newOrder);
    })
)

export default router;