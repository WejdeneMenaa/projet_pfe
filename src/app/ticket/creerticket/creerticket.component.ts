import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/_service/ticket.service';
import { HttpService } from 'src/app/_service/http.service';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from 'src/app/_service/token-storage.service';

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
  currentUser = null;




  constructor(private TicketService: TicketService, public http: HttpService, private https: HttpClient,private token: TokenStorageService) { }
  ngOnInit(): void {
    //this.currentUser = this.token.getUser();
   // monObjet:string = localStorage.getItem('monObjet');
    console.log("oussama"+localStorage.getItem('id'))
  }



  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }
  onSubmit() {

    const formData = new FormData();
    formData.append('file', this.images);

    this.https.post<any>('http://localhost:4200/api/ticket/file', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.ticket.user_id = localStorage.getItem('id');
    this.TicketService.create(this.ticket).subscribe(
      data => {
        //console.log("///"+this.currentUser.user_id)
        this.ticket.user_id = 89;
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;

      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
