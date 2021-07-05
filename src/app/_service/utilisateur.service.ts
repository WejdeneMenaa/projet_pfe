import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Utilisateur } from '../_models/utilisateur';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const baseUrl = 'http://localhost:4200/api/utilisateur';
const API_URL = 'http://localhost:4200/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private userSubject: BehaviorSubject<Utilisateur>;
  public user: Observable<Utilisateur>;
  constructor(private http: HttpClient,
    private router: Router,
  ) { }

  /*getUtilisateurs(){
    return this.http.get("/api/utilisateur")
  }*/

  public get userValue(): Utilisateur {
    return this.userSubject.value;
  }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(user_id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${user_id}`);
  }


  create(data: { username: string; email: string; password: string; }): Observable<any> {
    return this.http.post(baseUrl, data);
  }


  update(user_id, params) {
    return this.http.put(`${baseUrl}/${user_id}`, params)
      .pipe(map(x => {
        console.log("**" + JSON.stringify(x))
        // update stored user if the logged in user updated their own record
        if (user_id == this.userValue.id) {
          // update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.userSubject.next(user);
        }

        return x;

      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  delete(user_id: string) {
    return this.http.delete(`${baseUrl}/${user_id}`)
      .pipe(map(x => {
        // auto logout if the logged in user deleted their own record
        if (user_id == this.userValue.id) {
          this.logout();
        }
        return x;
      }));
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
