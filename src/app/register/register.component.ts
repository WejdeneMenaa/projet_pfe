import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/_service/utilisateur.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  utilisateur = {
    username: '',
    email: '',
    password: ''
  };
  submitted = false;
  constructor( private UtilisateurService: UtilisateurService) { }

  ngOnInit(): void {
  }

  
  saveTutorial(): void {
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

}

