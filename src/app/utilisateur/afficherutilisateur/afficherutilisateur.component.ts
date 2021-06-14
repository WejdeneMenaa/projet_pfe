import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from 'src/app/_service/utilisateur.service';

@Component({
  selector: 'app-afficherutilisateur',
  templateUrl: './afficherutilisateur.component.html',
  styleUrls: ['./afficherutilisateur.component.css']
})
export class AfficherutilisateurComponent implements OnInit {
users=null;
utilisateur = null ;

constructor(
    private utilisateurservice: UtilisateurService,
     private route: ActivatedRoute,
    private router: Router) { }
  
  

  ngOnInit(): void {
    this.utilisateurservice.getAll().subscribe((data)=> {
this.users = data
    })

  }



  deleteTutorial(): void {
    
    this.utilisateurservice.delete(this.utilisateur.user_id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/utilisateur']);
        },
        error => {
          console.log(error);
        });
  }
  
}

  
