import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { TicketService } from 'src/app/_service/ticket.service';

@Component({
  selector: 'app-afficherticketaffecte',
  templateUrl: './afficherticketaffecte.component.html',
  styleUrls: ['./afficherticketaffecte.component.css']
})
export class AfficherticketaffecteComponent implements OnInit {
  tickets = null;
  ticket: any = {};
  id: string;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showTechnicienBoard = false;
  username: string;
  user = null;
  ticket_id: number;
  isAddMode: boolean;



  constructor(
    private TicketService: TicketService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router) { }



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
    console.log("sahar" + ticket_id)
    const ticket = this.tickets.find(x => x.id === ticket_id);
    this.TicketService.delete(ticket_id)
      .pipe(first())
      .subscribe(() => this.tickets = this.tickets.filter(x => x.id !== ticket_id));
    this.ngOnInit();
  }

  updateStatus2(ticket_id: string) {
    const link = ['/ticket'];
    console.log('**********************here')
    this.ticket.statut = 'cloture'
    this.TicketService.update(ticket_id, this.ticket).subscribe((data) => {
      this.ticket = data
      console.log("user" + this.ticket)
    })
    this.ngOnInit();
    this.router.navigate(link);

  }

}



