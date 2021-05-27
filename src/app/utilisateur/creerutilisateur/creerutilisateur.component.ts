import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/services/utilisateur.service';

@Component({
  selector: 'app-creerutilisateur',
  templateUrl: './creerutilisateur.component.html',
  styleUrls: ['./creerutilisateur.component.css']
})
export class CreerutilisateurComponent implements OnInit {

  utilisateur = {
    name: '',
    description: '',
    available: false
  };
  submitted = false;
  constructor( private UtilisateurService: UtilisateurService) { }

  ngOnInit(): void {
  }

  createProduct(): void {
    const data = {
      name: this.utilisateur.name,
      description: this.utilisateur.description
    };

    this.UtilisateurService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newProduct(): void {
    this.submitted = false;
    this.utilisateur = {
      name: '',
      description: '',
      available: false
    };
  }

}

