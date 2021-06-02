import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:4200/api/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http: HttpClient) { }

  /*getUtilisateurs(){
    return this.http.get("/api/utilisateur")
  }*/

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(user_id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${user_id}`);
  }

  create(data: { username: string; email: string; password: string; }): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(user_id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${user_id}`, data);
  }

  delete(user_id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${user_id}`);
  }


}
