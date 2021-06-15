import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/_models/utilisateur';

@Component({
  selector: 'app-utilisateurboard',
  templateUrl: './utilisateurboard.component.html',
  styleUrls: ['./utilisateurboard.component.css']
})
export class UtilisateurboardComponent implements OnInit {
  utilisateur: Utilisateur;
  users=null;


  constructor() { }

  ngOnInit(): void {
  }

}
