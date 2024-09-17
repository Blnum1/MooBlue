import { Injectable } from '@angular/core';
import { Pork } from '../shared/models/Pork';
import { sample_Porks, sample_tags } from '../../data';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { PORK_BY_ID_URL, PORKS_BY_SEARCH_URL, PORKS_BY_TAG_URL, PORKS_TAGS_URL, PORKS_URL } from '../shared/models/constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PorkService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Pork[]> {
    return this.http.get<Pork[]>(PORKS_URL);
  }

  getAllPorksBySearchTerm(searchTerm:string){
    return this.http.get<Pork[]>(PORKS_BY_SEARCH_URL + searchTerm)
  }
  getAllTags():Observable<Tag[]>{
    return this.http.get<Tag[]>(PORKS_TAGS_URL);
  }
  getAllPorksByTag(tag: string): Observable<Pork[]> {
    return tag === "All"?
    this.getAll():
    this.http.get<Pork[]>(PORKS_BY_TAG_URL + tag);
  }

  getPorkById(porkId:string): Observable<Pork>{
    return this.http.get<Pork>(PORK_BY_ID_URL + porkId);
  }
}
