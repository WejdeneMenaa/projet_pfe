import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/_service/http.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { StockService } from 'src/app/_service/stock.service'


@Component({
  selector: 'app-creerstock',
  templateUrl: './creerstock.component.html',
  styleUrls: ['./creerstock.component.css']
})
export class CreerstockComponent implements OnInit {
  stock: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  loading = false;
  buttionText = "Submit";
  submitted = false;
  //categorie: any = ['materiel', 'logiciel', 'reseaux'];
  categorie: any = [];
  sous_categorie: any = [];



  constructor(private router: Router,
    private StockService: StockService,
    public http: HttpService,
    private https: HttpClient,
    private token: TokenStorageService) { }
  ngOnInit(): void {
    console.log("***" + localStorage.getItem('id'))
    this.categorie = this.StockService.categorie();
  }

  onSelect(categorie){
    this.sous_categorie = this.StockService.sous_categorie()
    .filter(e=> 
     e.id == categorie.target.value);
  }

  onSubmit() {
    const link = ['/stock'];

    this.StockService.create(this.stock).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;

      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
    (err) => console.log(err)

    this.router.navigate(link);
    this.ngOnInit();

  }


}