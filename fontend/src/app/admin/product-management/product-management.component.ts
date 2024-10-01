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
  
  // สำหรับสร้างผลิตภัณฑ์ใหม่
  newProductName: string = '';
  newProductPrice: number = 0;
  newProductImageUrl: string = '';
  newProductKilo: string = '';
  newProductTags: string = '';

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
    const tagsArray = this.newProductTags.split(',').map(tag => tag.trim()); // แยก tags
    const newProduct: Pork = {
      id: '',
      name: this.newProductName,
      price: this.newProductPrice,
      tags: tagsArray,
      favorite: false,
      stars: 0,
      imageUrl: this.newProductImageUrl,
      kilo: this.newProductKilo
    };

    this.porkService.create(newProduct).subscribe(product => {
      console.log('Product created:', product);
      this.loadProducts();
      // เคลียร์ข้อมูลหลังจากสร้างสำเร็จ
      this.newProductName = '';
      this.newProductPrice = 0;
      this.newProductImageUrl = '';
      this.newProductKilo = '';
      this.newProductTags = '';
    });
  }

  onPriceChange(product: Pork) {
    console.log(`Price updated for ${product.name}: ${product.price}`);
    // ถ้าต้องการให้ทำการบันทึกอัตโนมัติทุกครั้งที่มีการเปลี่ยนแปลงราคา
    this.editProduct(product);
  }

  editProduct(product: Pork) {
    const updatedProduct: Pork = {
      ...product,
      // คุณสามารถกำหนดราคาใหม่ที่นี่หากต้องการ
    };

    this.porkService.update(product.id, updatedProduct).subscribe(updated => {
      console.log('Product updated:', updated);
      this.loadProducts(); // โหลดรายการใหม่หลังจากแก้ไขสำเร็จ
    });
  }

  deleteProduct(productId: string) {
    this.porkService.delete(productId).subscribe(() => {
      console.log('Product deleted:', productId);
      this.loadProducts(); // โหลดรายการใหม่หลังจากลบสำเร็จ
    });
  }
}
