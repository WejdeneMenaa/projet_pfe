import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



const AUTH_API = 'http://localhost:4200/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  link = 'http://localhost:4200/user';

  constructor(private http: HttpClient) { }

  login(credentials: { username: any; password: any; }): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(utilisateur: { username: any; email: any; password: any; nom: any; prenom: any; phone: any; gender: any; status: any; }): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: utilisateur.username,
      email: utilisateur.email,
      password: utilisateur.password,
      nom: utilisateur.nom,
      prenom: utilisateur.prenom,
      phone: utilisateur.phone,
      gender: utilisateur.gender,
      status: utilisateur.status
    }, httpOptions);
  }
}
