import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { StockService } from 'src/app/_service/stock.service'
import { DialogService } from 'src/app/_service/dialog.service';
import { CategorieService } from 'src/app/_service/categorie.service';
import { ScategorieService } from 'src/app/_service/scategorie.service';

@Component({
  selector: 'app-afficherstock',
  templateUrl: './afficherstock.component.html',
  styleUrls: ['./afficherstock.component.css']
})
export class AfficherstockComponent implements OnInit {
  stocks = null;
  stock: any = {};
  id: string;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showTechnicienBoard = false;
  username: string;
  name: any;
  user = null;
  stock_id: number;
  isAddMode: boolean;
  categories = null;
  scategories = null;



  constructor(
    private StockService: StockService,
    private categorieservice: CategorieService,
    private scategorieservice: ScategorieService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogservice: DialogService) { }



  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      this.roles = this.user.roles;
      this.username = this.user.username;
      this.id = this.user.id;
      localStorage.setItem('id', this.id);
    }
    this.stock_id = this.route.snapshot.params['id'];
    this.isAddMode = !this.stock_id;
    this.StockService.getAll().subscribe((data) => {
      this.stocks = data
    })

    this.categorieservice.getAll().subscribe((data) => {
      this.categories = data
      console.log("categories" + this.categories)
    })

    this.scategorieservice.getAll().subscribe((data) => {
      this.scategories = data
      console.log("sous_categories" + this.scategories)
    })

  }

  deleteStock(stock_id: string) {
    this.dialogservice.openConfirmDialog('voulez-vous vraiment supprimer ce stock ?')
      .afterClosed().subscribe(res => {
        console.log(res);
        if (res) {
          const stock = this.stocks.find(x => x.id === stock_id);
          this.StockService.delete(stock_id)
            .pipe(first())
            .subscribe(() => this.stocks = this.stocks.filter(x => x.id !== stock_id));
          this.ngOnInit();
        }
        this.ngOnInit();
      });
  }

  Search() {
    if (this.name == "") {
      this.ngOnInit();
    }
    else {
      this.stocks = this.stocks.filter(res => {
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      }
      )
    }
  }

}


