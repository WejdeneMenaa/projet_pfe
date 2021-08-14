import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Stock } from '../_models/stock';


const baseUrl = 'http://localhost:4200/api/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private stockSubject: BehaviorSubject<Stock>;
  public stock: Observable<Stock>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public get stockValue(): Stock {
    if (this.stockSubject && this.stockSubject.value) {
      return this.stockSubject.value;
    } else {
      return null
    }
  }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(stock_id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${stock_id}`);
  }

  create(data: {
    name: string;
    categorie: string;
    sous_categorie: string;
    quantite: number;
    modele: string;
    cat_id:number;
    scat_id:number;
  }): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(stock_id, params) {
    return this.http.put(`${baseUrl}/${stock_id}`, params)
      .pipe(map(x => {
        console.log("**" + JSON.stringify(x))
        if (this.stockValue && this.stockValue.stock_id == this.stockValue.stock_id) {
          const stock = { ...this.stockValue, ...params };
          localStorage.setItem('stock', JSON.stringify(stock));
          this.stockSubject.next(stock);
        }

        return x;

      }));
  }

  delete(stock_id: string) {
    return this.http.delete(`${baseUrl}/${stock_id}`)
      .pipe(map(x => {
        return x;
      }));
  }
}
