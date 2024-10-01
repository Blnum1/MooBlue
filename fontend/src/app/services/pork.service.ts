import { Injectable } from '@angular/core';
import { Pork } from '../shared/models/Pork';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { PORK_BY_ID_URL, PORKS_BY_SEARCH_URL, PORKS_BY_TAG_URL, PORKS_TAGS_URL, PORKS_URL } from '../shared/models/constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PorkService {

  constructor(private http: HttpClient) { }

  // ฟังก์ชันดึงข้อมูลทั้งหมด
  getAll(): Observable<Pork[]> {
    return this.http.get<Pork[]>(PORKS_URL);
  }

  // ฟังก์ชันค้นหาผลิตภัณฑ์ตาม search term
  getAllPorksBySearchTerm(searchTerm: string): Observable<Pork[]> {
    return this.http.get<Pork[]>(PORKS_BY_SEARCH_URL + searchTerm);
  }

  // ฟังก์ชันดึงข้อมูล Tags ทั้งหมด
  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(PORKS_TAGS_URL);
  }

  // ฟังก์ชันดึงผลิตภัณฑ์ตาม tag
  getAllPorksByTag(tag: string): Observable<Pork[]> {
    return tag === "All" ? this.getAll() : this.http.get<Pork[]>(PORKS_BY_TAG_URL + tag);
  }

  // ฟังก์ชันดึงข้อมูลผลิตภัณฑ์ตาม ID
  getPorkById(porkId: string): Observable<Pork> {
    return this.http.get<Pork>(PORK_BY_ID_URL + porkId);
  }

  // ฟังก์ชันสร้างผลิตภัณฑ์ใหม่
  create(product: Pork): Observable<Pork> {
    return this.http.post<Pork>(PORKS_URL, product);
  }

  // ฟังก์ชันแก้ไขผลิตภัณฑ์
  update(productId: string, product: Pork): Observable<Pork> {
    return this.http.put<Pork>(`${PORKS_URL}/${productId}`, product);
  }

  // ฟังก์ชันลบผลิตภัณฑ์
  delete(productId: string): Observable<void> {
    return this.http.delete<void>(`${PORKS_URL}/${productId}`);
  }
}
