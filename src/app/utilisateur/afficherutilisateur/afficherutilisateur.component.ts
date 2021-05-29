import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/_service/utilisateur.service';

@Component({
  selector: 'app-afficherutilisateur',
  templateUrl: './afficherutilisateur.component.html',
  styleUrls: ['./afficherutilisateur.component.css']
})
export class AfficherutilisateurComponent implements OnInit {
users:any;
  constructor(
    private utilisateurservice: UtilisateurService
  )
  
  { }

  ngOnInit(): void {
    this.utilisateurservice.getUtilisateurs().subscribe((data)=> {
this.users = data
    })

  }

}
