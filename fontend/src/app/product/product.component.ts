import { Component, OnInit } from '@angular/core';
import { Pork } from '../shared/models/Pork';
import { PorkService } from '../services/pork.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  porks: Pork[] = [];
  constructor(
    private porkService: PorkService,
    private activatedRoute: ActivatedRoute) { 
    
      let porksObservalbe:Observable<Pork[]>;
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
        porksObservalbe = this.porkService.getAllPorksBySearchTerm(params.searchTerm);
      else if (params.tag)
        porksObservalbe = this.porkService.getAllPorksByTag(params.tag);
      else
        porksObservalbe = porkService.getAll();

        porksObservalbe.subscribe((serverPorks) => {
          this.porks = serverPorks;
    })
  })
}

  ngOnInit(): void {
    
  }

}
