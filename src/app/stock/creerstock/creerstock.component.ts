import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/_service/http.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { StockService } from 'src/app/_service/stock.service'
import { CategorieService } from 'src/app/_service/categorie.service';
import { ScategorieService } from 'src/app/_service/scategorie.service';


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
  categories = null;
  scategories = null;



  constructor(private router: Router,
    private StockService: StockService,
    private categorieservice: CategorieService,
    private scategorieservice: ScategorieService,
    public http: HttpService,
    private https: HttpClient,
    private token: TokenStorageService) { }
  ngOnInit(): void {
    console.log("***" + localStorage.getItem('id'))
    //this.categorie = this.StockService.categorie();

    this.categorieservice.getAll().subscribe((data) => {
      this.categories = data
      console.log("categories" + this.categories)
    })

    this.scategorieservice.getAll().subscribe((data) => {
      this.scategories = data
      console.log("sous_categories" + this.scategories)
    })
  }

  /* onSelect(categorie){
     this.sous_categorie = this.StockService.sous_categorie()
     .filter(e=> 
      e.id == categorie.target.value);
   }*/

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