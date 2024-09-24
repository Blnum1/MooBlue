import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../shared/models/Order';

@Component({
  selector: 'oder-items-list',
  templateUrl: './oder-items-list.component.html',
  styleUrl: './oder-items-list.component.css'
})
export class OderItemsListComponent implements OnInit{

  @Input()
  order!:Order;
  constructor(){}

  ngOnInit(): void {
    
  }
}
