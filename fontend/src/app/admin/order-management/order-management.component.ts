import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../shared/models/Order';

interface OrdersByMonth {
  [key: string]: Order[]; // คำสั่งซื้อที่จัดกลุ่มตามเดือน
}

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  orders: Order[] = [];
  sortedOrdersByMonth: OrdersByMonth = {}; // เก็บคำสั่งซื้อแยกตามเดือน
  orderDetails: boolean[] = [];
  selectedDate: string;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders(); // เรียกใช้ฟังก์ชันเพื่อดึงคำสั่งซื้อ
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (data: Order[]) => {
        this.orders = data;
        this.groupOrdersByMonth(); // จัดกลุ่มคำสั่งซื้อโดยใช้เดือน
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  // ฟังก์ชันสำหรับจัดกลุ่มคำสั่งซื้อตามเดือน
  groupOrdersByMonth(): void {
    this.sortedOrdersByMonth = this.orders.reduce((acc: OrdersByMonth, order) => {
      const orderDate = new Date(order.createdAt);
      const monthYear = orderDate.toLocaleString('default', { month: 'long', year: 'numeric' }); // ตัวอย่าง: 'September 2024'

      if (!acc[monthYear]) {
        acc[monthYear] = []; // สร้าง array ใหม่สำหรับเดือน/ปีนี้
      }

      acc[monthYear].push(order);
      return acc;
    }, {} as OrdersByMonth); // ใช้ type assertion เพื่อให้ TypeScript รู้จักประเภท
  }

  toggleOrderDetails(index: number): void {
    this.orderDetails[index] = !this.orderDetails[index]; // Toggle การแสดงผลรายละเอียดคำสั่งซื้อ
  }

  getTotalPriceForMonth(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.totalPrice, 0);
  }

  onDateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedDate = target.value; // เก็บวันที่ที่เลือก
    this.filterOrdersBySelectedDate(); // เรียกใช้ฟังก์ชันกรองคำสั่งซื้อ
  }

  filterOrdersBySelectedDate(): void {
    if (this.selectedDate) {
      const selectedDateObj = new Date(this.selectedDate);

      const filteredOrders = this.orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return (
          orderDate.getDate() === selectedDateObj.getDate() &&
          orderDate.getMonth() === selectedDateObj.getMonth() &&
          orderDate.getFullYear() === selectedDateObj.getFullYear()
        );
      });

      this.sortedOrdersByMonth = this.groupOrders(filteredOrders);
    } else {
      this.groupOrdersByMonth(); // หากไม่มีการเลือกวันที่ ให้แสดงคำสั่งซื้อตามเดิม
    }
  }

  // Helper function to re-group filtered orders
  groupOrders(orders: Order[]): OrdersByMonth {
    return orders.reduce((acc: OrdersByMonth, order) => {
      const orderDate = new Date(order.createdAt);
      const monthYear = orderDate.toLocaleString('default', { month: 'long', year: 'numeric' });

      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(order);

      return acc;
    }, {} as OrdersByMonth);
  }
}
