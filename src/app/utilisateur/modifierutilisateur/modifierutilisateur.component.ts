import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from 'src/app/_service/utilisateur.service';

@Component({
  selector: 'app-modifierutilisateur',
  templateUrl: './modifierutilisateur.component.html',
  styleUrls: ['./modifierutilisateur.component.css']
})
export class ModifierutilisateurComponent implements OnInit {

  utilisateur = null ;
  message = '';

  constructor(
    private utilisateurservice: UtilisateurService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getTutorial(this.route.snapshot.paramMap.get('user_id'));
  }

  getTutorial(user_id: string | null) {
    this.utilisateurservice.get(user_id)
      .subscribe(
        data => {
          this.utilisateur = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }



  updateTutorial() {
    this.utilisateurservice.update(this.utilisateur.user_id, this.utilisateur)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  deleteTutorial() {
    this.utilisateurservice.delete(this.utilisateur.user_id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/tutorials']);
        },
        error => {
          console.log(error);
        });
  }
}