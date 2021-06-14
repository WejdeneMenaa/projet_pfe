import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/_service/utilisateur.service';

@Component({
  selector: 'app-creerutilisateur',
  templateUrl: './creerutilisateur.component.html',
  styleUrls: ['./creerutilisateur.component.css']
})
export class CreerutilisateurComponent implements OnInit {

  ouvert_le = new Date();

  utilisateur = {
    name: '',
    description: '',
    available: false
  };
  submitted = false;
  constructor( private UtilisateurService: UtilisateurService,private datePipe: DatePipe) {
     
   }

  ngOnInit(): void {
  }

  

}

