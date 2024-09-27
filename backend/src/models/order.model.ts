import {model, Schema, Types} from'mongoose';
import { Pork, PorkSchema } from './pork.model';
import { OrderStatus } from '../constants/order_status';

export interface OrderItem{
    pork: Pork;
    price: number;
    quantity: number;
}

export const OrderItemSchema = new Schema<OrderItem>(
    {
        pork:{type: PorkSchema, required: true},
        price:{type: Number, required: true},
        quantity:{type: Number,required:true}
    }
);

export interface Order{
    id:number;
    items: OrderItem[];
    totalPrice:number;
    name: string;
    address: string;
    paymentId: string;
    createdAt: string;
    status: OrderStatus;
    user: Types.ObjectId;
    creatAt: Date;
    updateAt: Date
}
 const orderSchema = new Schema<Order>({
    name: {type: String, required: true},
    address: {type: String, required: true},
    paymentId: {type: String},
    totalPrice: {type: Number, required: true},
    items: {type: [OrderItemSchema], required: true},
    status: {type: String, default: OrderStatus.NEW},
    user: {type: Schema.Types.ObjectId, required: true}
 },{
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
 });
 
 export const OrderModel = model('order', orderSchema);