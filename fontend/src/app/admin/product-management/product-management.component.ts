import { Component, OnInit } from '@angular/core';


import { PorkService } from '../../services/pork.service';
import { Pork } from '../../shared/models/Pork';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  products: Pork[] = [];

  constructor(private porkService: PorkService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.porkService.getAll().subscribe(products => {
      this.products = products;
    });
  }

  createProduct() {
    // ฟังก์ชันสำหรับสร้างผลิตภัณฑ์ใหม่
    // คุณสามารถเปิด modal หรือทำการส่งข้อมูลไปยัง server ได้ที่นี่
    console.log("Creating new product...");
  }

  editProduct(product: Pork) {
    // ฟังก์ชันสำหรับแก้ไขผลิตภัณฑ์
    // คุณสามารถเปิด modal หรือทำการส่งข้อมูลไปยัง server ได้ที่นี่
    console.log("Editing product: ", product);
  }

  deleteProduct(productId: string) {
    // ฟังก์ชันสำหรับลบผลิตภัณฑ์
    console.log("Deleting product with ID: ", productId);
    // คุณอาจจะเรียกใช้งาน service เพื่อลบผลิตภัณฑ์
  }
}