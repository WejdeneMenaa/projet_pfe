import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
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

  deleteUser(user_id: string) {
    console.log("oussama"+user_id)
    const user = this.users.find(x => x.id === user_id);
    this.utilisateurservice.delete(user_id)
        .pipe(first())
        .subscribe(() => this.users = this.users.filter(x => x.id !== user_id));
        this.ngOnInit();
}

  
}

  
