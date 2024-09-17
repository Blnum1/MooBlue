import { Component, OnInit } from '@angular/core';
import { Pork } from '../shared/models/Pork';
import { PorkService } from '../services/pork.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  porks: Pork[] = [];

  constructor(
    private porkService: PorkService,
    private activatedRoute: ActivatedRoute // เพิ่ม private
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['searchTerm']) {
        this.porks = this.porkService.getAllfoodBySearchTerm(params['searchTerm']);
      } else if (params['tag']) {
        this.porks = this.porkService.getAllPorksByTag(params['tag']);
      } else {
        this.porks = this.porkService.getAll();
      }
    });
  }

}
