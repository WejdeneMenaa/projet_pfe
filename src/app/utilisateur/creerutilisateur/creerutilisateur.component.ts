import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/_service/utilisateur.service';

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

  

}

