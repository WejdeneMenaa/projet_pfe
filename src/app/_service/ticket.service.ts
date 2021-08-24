import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ticket } from '../_models/ticket';

const baseUrl = 'http://localhost:4200/api/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private ticketSubject: BehaviorSubject<Ticket>;
  public ticket: Observable<Ticket>;

  constructor(private http: HttpClient,
    private router: Router) { }


  public get ticketValue(): Ticket {
    if(this.ticketSubject && this.ticketSubject.value) {
      return this.ticketSubject.value;
    } else {
      return null
    } 
  }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(ticket_id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${ticket_id}`);
  }

  create(data: {
    date_crearion: Date;
    date_echeance: Date;
    description: string;
    titre: string;
    statut: String;
    type: string;
    priorite: string;
    urgence: string;
    impact: string;
    image: string;
    solution: string;
    attribuea: number;
    user_id: number;
  }): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(ticket_id, params) {
    return this.http.put(`${baseUrl}/${ticket_id}`, params)
      .pipe(map(x => {
        console.log("**" + JSON.stringify(x))
        // update stored user if the logged in user updated their own record

        if (ticket_id == this.ticketValue.ticket_id) {
          // update local storage
          const ticket = { ...this.ticketValue, ...params };
          localStorage.setItem('ticket', JSON.stringify(ticket));
          // publish updated user to subscribers
          this.ticketSubject.next(ticket);
        }

        return x;

      }));
  }

  delete(user_id: string) {
    return this.http.delete(`${baseUrl}/${user_id}`)
      .pipe(map(x => {
        return x;
      }));
  }
  sendEmail(url, body) {
    return this.http.post(url, body);
  }

  getTicketByStatut(statut:any){
    return this.http.get<any>('http://localhost:4200/api/ticket/statut/'+statut)
  }

  getTicketByUser(user_id:string){
    return this.http.get<any>('http://localhost:4200/api/ticket/user/'+localStorage.getItem('id'))
  }

  getTicketByStatutAndUser(statut:any,user_id:string){
    return this.http.get<any>('http://localhost:4200/api/ticket/statut/'+statut+localStorage.getItem('id'))
  }

}
