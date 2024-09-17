import { Injectable } from '@angular/core';
import { Pork } from '../shared/models/Pork';
import { sample_Porks, sample_tags } from '../../data';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class PorkService {

  constructor() { }

  getAll(): Pork[] {
    return sample_Porks;
  }

  getAllfoodBySearchTerm(searchTerm:string){
    return this.getAll().filter(pork => pork.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }
  getAllTags():Tag[]{
    return sample_tags;
  }
  getAllPorksByTag(tag: string): Pork[] {
    return tag === "All"?
    this.getAll():
    this.getAll().filter(pork => pork.tags?.includes(tag));
  }

  getPorkById(porkId:string):Pork{
    return this.getAll().find(pork => pork.id == porkId) ?? new Pork();
  }
}
