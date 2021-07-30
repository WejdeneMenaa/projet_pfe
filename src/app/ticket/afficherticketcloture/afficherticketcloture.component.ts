import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { TicketService } from 'src/app/_service/ticket.service';

@Component({
  selector: 'app-afficherticketcloture',
  templateUrl: './afficherticketcloture.component.html',
  styleUrls: ['./afficherticketcloture.component.css']
})
export class AfficherticketclotureComponent implements OnInit {

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
  

}


