import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:4200/api/utilisateur';
const API_URL = 'http://localhost:4200/api/test/';

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


  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

}
