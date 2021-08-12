import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UtilisateurService } from 'src/app/_service/utilisateur.service';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from 'src/app/utilisateur/profile/profile.component';
import { DialogService } from 'src/app/_service/dialog.service';
import { Utilisateur } from 'src/app/_models/utilisateur';



@Component({
  selector: 'app-afficherutilisateur',
  templateUrl: './afficherutilisateur.component.html',
  styleUrls: ['./afficherutilisateur.component.css'],
  providers: [ConfirmationService]
})
export class AfficherutilisateurComponent implements OnInit {
  msgs: Message[] = [];
  users : Utilisateur[] = [];
  nom: any;
  utilisateur = null;

  constructor(
    private utilisateurservice: UtilisateurService,
    public dialog: MatDialog,
    private dialogservice: DialogService) { }



  ngOnInit(): void {
    this.utilisateurservice.getAll().subscribe((data) => {
      this.users = data
      //.filter(status => status.isActive);
    })

  }

  openDialog() {
    this.dialog.open(ProfileComponent);
  }


  updateStatus(status, utilisateur) {
    const data = {
      status: status
    };

    console.log("***" + this.users)
    this.utilisateurservice.update(utilisateur.user_id, data)
      .subscribe(
        response => {
          //  this.users.status = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
    this.ngOnInit();
  }

  deleteUser(user_id: string) {
    this.dialogservice.openConfirmDialog('voulez-vous vraiment supprimer cet utilisateur ?')
      .afterClosed().subscribe(res => {
        console.log(res);
        if (res) {
          this.utilisateurservice.delete(user_id)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter(x => x.id !== user_id));
          this.ngOnInit();
        }
      });
  }

  Search() {
    if (this.nom == "") {
      this.ngOnInit();
    }
    else {
      this.users = this.users.filter(res => {
        return res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase());
      }
      )
    }
  }
  
}


