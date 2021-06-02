import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/_service/utilisateur.service';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  utilisateur: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

 
  submitted = false;

  constructor(private authService: AuthService) { }
  ngOnInit(): void {
  }

  
  /*saveTutorial(): void {
    const data = {
      username: this.utilisateur.username,
      email: this.utilisateur.email,
      password: this.utilisateur.password
    };

    this.UtilisateurService.create(data)
      .subscribe(
        (        response: any) => {
          console.log(response);
          this.submitted = true;
        },
        (        error: any) => {
          console.log(error);
        });
  }

  newTutorial(): void {
    this.submitted = false;
    this.utilisateur = {
      username: '',
      email: '',
      password:''
    };
  }
*/

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
  }
}

