import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { TicketService } from 'src/app/_service/ticket.service';


@Component({
  selector: 'app-afficherticket',
  templateUrl: './afficherticket.component.html',
  styleUrls: ['./afficherticket.component.css']
})
export class AfficherticketComponent implements OnInit {
  tickets = null;
  ticket = null;

  constructor(
    private TicketService: TicketService,
    private route: ActivatedRoute,
    private router: Router) { }



  ngOnInit(): void {
    this.TicketService.getAll().subscribe((data) => {
      this.tickets = data
      //.filter(status => status.isActive);
    })

  }

  updateStatus(status,ticket) {
    const data = {
     status:status
    };

    console.log("***"+this.tickets)
    this.TicketService.update(ticket.ticket_id, data)
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


  deleteTicket(ticket_id: string) {
    console.log("sahar" + ticket_id)
    const ticket = this.tickets.find(x => x.id === ticket_id);
    this.TicketService.delete(ticket_id)
      .pipe(first())
      .subscribe(() => this.tickets = this.tickets.filter(x => x.id !== ticket_id));
    this.ngOnInit();
  }


}


