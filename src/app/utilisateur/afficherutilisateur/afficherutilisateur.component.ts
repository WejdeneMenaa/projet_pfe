import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UtilisateurService } from 'src/app/_service/utilisateur.service';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';



@Component({
  selector: 'app-afficherutilisateur',
  templateUrl: './afficherutilisateur.component.html',
  styleUrls: ['./afficherutilisateur.component.css'],
  providers: [ConfirmationService]
})
export class AfficherutilisateurComponent implements OnInit {
  msgs: Message[] = [];
  users = null;
  utilisateur = null;
  nom = "saharrr"
  constructor(
    private utilisateurservice: UtilisateurService,
    private confirmationService: ConfirmationService, 
    private route: ActivatedRoute,
    private router: Router) { }



  ngOnInit(): void {
    this.utilisateurservice.getAll().subscribe((data) => {
      this.users = data
      //.filter(status => status.isActive);
    })

  }

  updateStatus(status,utilisateur) {
    const data = {
     status:status
    };

    console.log("***"+this.users)
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
    const user = this.users.find(x => x.id === user_id);
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
      },
      reject: () => {
          this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
  });
    this.utilisateurservice.delete(user_id)
      .pipe(first())
      .subscribe(() => this.users = this.users.filter(x => x.id !== user_id));
    this.ngOnInit();
  }


}


