import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:4200/api/scategorie';


@Injectable({
  providedIn: 'root'
})
export class ScategorieService {
  
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  getSCatByCat(cat_id:any){
    return this.http.get<any>('http://localhost:4200/api/scategorie/scat/'+cat_id)
  }

  // getSCatByCat(cat_id:any):Observable<any>{
  //   return this.http.get(`${baseUrl}/scat/${cat_id}`)
  // }

}
