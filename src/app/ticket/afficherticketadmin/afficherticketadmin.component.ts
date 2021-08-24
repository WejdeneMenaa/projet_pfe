import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { TicketService } from 'src/app/_service/ticket.service';
import { DialogService } from 'src/app/_service/dialog.service';


@Component({
  selector: 'app-afficherticketadmin',
  templateUrl: './afficherticketadmin.component.html',
  styleUrls: ['./afficherticketadmin.component.css']
})
export class AfficherticketadminComponent implements OnInit {
  tickets = null;
  ticket: any = {};
  id: string;
  private roles: string[];
  isLoggedIn = false;
  username: string;
  user = null;
  ticket_id: number;
  isAddMode: boolean;
  titre: any;



  constructor(
    private TicketService: TicketService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router, private dialogservice: DialogService) { }



  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      this.roles = this.user.roles;
      this.username = this.user.username;
      this.id = this.user.id;
      localStorage.setItem('id', this.id);
    }
    this.ticket_id = this.route.snapshot.params['id'];
    this.isAddMode = !this.ticket_id;
    this.TicketService.getAll().subscribe((data) => {
      this.tickets = data
    })

  }

  deleteTicket(ticket_id: string) {
    this.dialogservice.openConfirmDialog('voulez-vous vraiment supprimer ce ticket ?')
      .afterClosed().subscribe(res => {
        console.log(res);
        if (res) {
          const ticket = this.tickets.find(x => x.id === ticket_id);
          this.TicketService.delete(ticket_id)
            .pipe(first())
            .subscribe(() => this.tickets = this.tickets.filter(x => x.id !== ticket_id));
          this.ngOnInit();
        }
      });
  }

  updateStatus2(ticket_id: string) {
    const link = ['/ticket'];
    console.log('**********************here')
    this.ticket.statut = 'Cloture'
    this.TicketService.update(ticket_id, this.ticket).subscribe((data) => {
      this.ticket = data
      console.log("user" + this.ticket)
    })
    this.ngOnInit();
    this.router.navigate(link);

  }

  Search() {
    if (this.titre == "") {
      this.ngOnInit();
    }
    else {
      this.tickets = this.tickets.filter(res => {
        return res.titre.toLocaleLowerCase().match(this.titre.toLocaleLowerCase());
      }
      )
    }
  }
}


