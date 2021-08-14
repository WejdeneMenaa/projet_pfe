import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/_service/http.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { StockService } from 'src/app/_service/stock.service'
import { CategorieService } from 'src/app/_service/categorie.service';
import { ScategorieService } from 'src/app/_service/scategorie.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  categories = null;
  scategories=null;
  cat_id: string;
  scat_id: string;
  form: FormGroup;




  constructor(private router: Router,
    private StockService: StockService,
    private categorieservice: CategorieService,
    private scategorieservice: ScategorieService,
    public http: HttpService,
    private formBuilder: FormBuilder,
    private https: HttpClient,
    private token: TokenStorageService) { }
  ngOnInit(): void {
    console.log("***" + localStorage.getItem('id'))
    this.categorieservice.getAll().subscribe((data) => {
      this.categories = data
      console.log("categories" + this.categories)
    })

    // this.scategorieservice.getAll().subscribe((data) => {
    //   this.scategories = data
    //   console.log("sous_categories" + this.scategories)
    // })

    this.form = this.formBuilder.group({
      cat_id: ['', Validators.required],
      scat_id: ['', Validators.required],

    });
  }

  getScat(cat_id){
    console.log(this.categories[cat_id.target.value])
    
    this.scategorieservice.getSCatByCat(cat_id.target.value).subscribe(data=>{
      this.scategories=data['rows'];
    })
  }

  onSubmit() {
    const link = ['/stock'];
    this.stock.cat_id = this.cat_id;
    this.stock.scat_id = this.scat_id;
    this.StockService.create(this.stock).subscribe((data) => {
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