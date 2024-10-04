import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements AfterViewInit {
  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart() {
    const ctx = (document.getElementById('salesChart') as HTMLCanvasElement).getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Sales Data',
          data: [1200, 1900, 3000, 2500, 3200, 1800, 2200],
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
}
