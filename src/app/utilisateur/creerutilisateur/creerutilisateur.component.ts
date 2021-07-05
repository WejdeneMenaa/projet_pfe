import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_service/auth.service';
import { HttpService } from 'src/app/_service/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './creerutilisateur.component.html',
  styleUrls: ['./creerutilisateur.component.css']
})
export class CreerutilisateurComponent implements OnInit {

  utilisateur: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  loading = false;
  buttionText = "Submit";
  submitted = false;

  constructor(private authService: AuthService, public http: HttpService) { }
  ngOnInit(): void {
  }


  onSubmit() {
    this.authService.register(this.utilisateur).subscribe(
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

    this.authService.sendEmail("http://localhost:4200/api/utilisateur/sendmail", this.utilisateur).subscribe(
      data => {
        let res: any = data;
        console.log(
          ` ${this.utilisateur.username} is successfully register and mail has been sent and the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);
        this.loading = false;
        this.buttionText = "Submit";
      }, () => {
        this.loading = false;
        this.buttionText = "Submit";
      }
    );
  }
}

