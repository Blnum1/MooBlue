import { Component, OnInit } from '@angular/core';
import { Tag } from '../../shared/models/Tag';
import { PorkService } from '../../services/pork.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit {
  tags?:Tag[];
  constructor(porkService:PorkService) {
    this.tags = porkService.getAllTags();
  }




  ngOnInit(): void {
    
  }

}
