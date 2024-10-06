import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { OrderService } from '../../services/order.service'; // import OrderService

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements AfterViewInit {
  dailySalesData: { [key: string]: number[] } = {}; // เก็บข้อมูลยอดขายรายวัน
  topTagsData: { _id: string; totalSold: number }[] = []; // สำหรับเก็บข้อมูล tags
  monthlySalesData: { [key: string]: number } = {}; // เก็บข้อมูลยอดขายรายเดือน

  constructor(private orderService: OrderService) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.getDailySalesData(); // เรียกเมธอดเพื่อดึงข้อมูลยอดขาย
    this.getTopTags(); // เรียกเมธอดเพื่อดึงข้อมูล tags
    this.getMonthlySalesData(); // เรียกเมธอดเพื่อดึงข้อมูลยอดขายรายเดือน
  }

  getDailySalesData(): void {
    this.orderService.getDailySalesData().subscribe(
      (data) => {
        this.processSalesData(data);
        this.createChart();
      },
      (error) => {
        console.error('Error fetching daily sales data:', error);
      }
    );
  }

  processSalesData(data: any): void {
    this.dailySalesData = data;
  }

  createChart(): void {
    const ctx = (document.getElementById('salesChart') as HTMLCanvasElement).getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(this.dailySalesData), // Dates as labels
        datasets: [{
          label: 'Daily Revenue',
          data: Object.values(this.dailySalesData), // Revenue values
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  getTopTags(): void {
    this.orderService.getTopTags().subscribe(
      (data) => {
        this.topTagsData = data;
        this.createPieChart(); // สร้างกราฟวงกลม
      },
      (error) => {
        console.error('Error fetching top tags data:', error);
      }
    );
  }

  createPieChart(): void {
    const ctx = (document.getElementById('tagsChart') as HTMLCanvasElement).getContext('2d');
    
    const brightColors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
      '#9966FF', '#FF9F40', '#FF6B6B', '#1D9BF0',
      '#2ED573', '#FFA502',
    ];

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.topTagsData.map(tag => tag._id), // ใช้ tags เป็น label
        datasets: [{
          label: 'Top Tags Sold',
          data: this.topTagsData.map(tag => tag.totalSold), // ใช้จำนวนขายเป็น data
          backgroundColor: this.topTagsData.map((_, index) => brightColors[index % brightColors.length]), // ใช้สีที่กำหนด
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Top Selling Tags'
          }
        }
      }
    });
  }

  getMonthlySalesData(): void {
    this.orderService.getMonthlySalesData().subscribe(
      (data) => {
        this.monthlySalesData = data; // เก็บข้อมูลที่ได้
        this.createMonthlyChart(); // สร้างกราฟยอดขายรายเดือน
      },
      (error) => {
        console.error('Error fetching monthly sales data:', error);
      }
    );
  }

  createMonthlyChart(): void {
    const ctx = (document.getElementById('monthlySalesChart') as HTMLCanvasElement).getContext('2d');
    
    new Chart(ctx, {
      type: 'bar', // หรือ 'line' ขึ้นอยู่กับว่าคุณต้องการให้กราฟเป็นแบบไหน
      data: {
        labels: Object.keys(this.monthlySalesData), // เดือนเป็น label
        datasets: [{
          label: 'Monthly Revenue',
          data: Object.values(this.monthlySalesData), // รายได้รายเดือน
          backgroundColor: 'rgba(153, 102, 255, 0.6)', // สีที่ใช้สำหรับกราฟ
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
