import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  images;

  constructor(private authService: AuthService, public http: HttpService, private https: HttpClient,private router: Router) { }
  ngOnInit(): void {
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

    const link = ['/users'];

    const formData = new FormData();
    formData.append('file', this.images);

    this.https.post<any>('http://localhost:4200/api/ticket/file', formData).subscribe(
      (res) => {
        console.log(res)
        this.utilisateur.image = res.file;
        this.authService.register(this.utilisateur).subscribe(
          data => {
            console.log(data);
            this.isSuccessful = true;
            this.isSignUpFailed = false;
            this.router.navigate(link);

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
    );
    this.ngOnInit();

  }
}


