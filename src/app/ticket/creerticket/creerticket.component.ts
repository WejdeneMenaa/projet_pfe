import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/_service/ticket.service';
import { HttpService } from 'src/app/_service/http.service';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creerticket',
  templateUrl: './creerticket.component.html',
  styleUrls: ['./creerticket.component.css']
})
export class CreerticketComponent implements OnInit {

  ticket: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  loading = false;
  buttionText = "Submit";
  submitted = false;
  categorie: any = ['materiel', 'logiciel', 'reseaux'];
  images;
  url: any;
  selectedImage: any;
  imageUrl: any;



  constructor(private router: Router,
    private TicketService: TicketService, 
    public http: HttpService, 
    private https: HttpClient, 
    private token: TokenStorageService) { }
  ngOnInit(): void {
    console.log("***" + localStorage.getItem('id'))
  }



  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log("file" + file);
      this.images = file;
      // this.ticket.image = file;
    }
  }

  onSubmit() {
    const link = ['/ticket'];


    const formData = new FormData();
    formData.append('file', this.images);

    this.https.post<any>('http://localhost:4200/api/ticket/file', formData).subscribe(
      (res) => {
        console.log(res)
        this.ticket.date_creation = Date.now();
        this.ticket.statut = 'Nouveau'
        this.ticket.image = res.file;
        this.ticket.user_id = localStorage.getItem('id');
        this.TicketService.create(this.ticket).subscribe(
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

      },
      (err) => console.log(err)
    );   
    this.ngOnInit();
    this.router.navigate(link);

  }
}
