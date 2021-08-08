import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_service/alert.service';
import { StockService } from 'src/app/_service/stock.service';

@Component({
  selector: 'app-modifierstock',
  templateUrl: './modifierstock.component.html',
  styleUrls: ['./modifierstock.component.css']
})
export class ModifierstockComponent implements OnInit {


  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  stock = null;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private StockService: StockService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.StockService.get(this.id).subscribe((data) => {
      this.stock = data

    })

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      modele: ['', Validators.required],
      quantite: ['', Validators.required]
    });

    if (!this.isAddMode) {
      this.StockService.get(this.id)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
        this.createStock();
    } else {
        this.updateStock();
    }
  }

  private createStock() {
    this.StockService.create(this.form.value)
        .pipe(first())
        .subscribe({
            next: () => {
                this.alertService.success('Stock added successfully', { keepAfterRouteChange: true });
                this.router.navigate(['../'], { relativeTo: this.route });
            },
            error: error => {
                this.alertService.error(error);
                this.loading = false;
            }
        });
}


  private updateStock() {
    const link = ['/stock'];
    this.StockService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Update successful', { keepAfterRouteChange: true });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
    this.router.navigate(link);
  }
}