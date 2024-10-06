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

  constructor(private orderService: OrderService) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.getDailySalesData(); // เรียกเมธอดเพื่อดึงข้อมูลยอดขาย
    this.getTopTags(); // เรียกเมธอดเพื่อดึงข้อมูล tags
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
    // Prepare the data for the chart
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
    
    // กำหนดสีสดใสที่ต้องการ
    const brightColors = [
        '#FF6384', // สีแดงสด
        '#36A2EB', // สีน้ำเงินสด
        '#FFCE56', // สีเหลืองสด
        '#4BC0C0', // สีฟ้า
        '#9966FF', // สีม่วง
        '#FF9F40', // ส้ม
        '#FF6B6B', // สีแดงอ่อน
        '#1D9BF0', // สีน้ำเงินเข้ม
        '#2ED573', // สีเขียวสด
        '#FFA502', // สีส้มสด
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
}
