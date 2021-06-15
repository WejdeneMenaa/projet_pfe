import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/_service/utilisateur.service';
import { AuthService } from 'src/app/_service/auth.service';

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

 
  submitted = false;

  constructor(private authService: AuthService) { }
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
  }
}

