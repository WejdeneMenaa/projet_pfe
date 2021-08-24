import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { TicketService } from '../_service/ticket.service';
import { UtilisateurService } from '../_service/utilisateur.service';
import { TokenStorageService } from '../_service/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../_service/dialog.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-board-technicien',
  templateUrl: './board-technicien.component.html',
  styleUrls: ['./board-technicien.component.css']
})
export class BoardTechnicienComponent implements OnInit {


  public options: any = {
    Chart: {
      type: 'area',
      height: 700
    },
    title: {
      text: 'Evolution de la population'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mail', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
      tickmarkPlacement: 'on',
      title: {
        enabled: false
      }
    },
    series: [{
      name: 'Tikets',
      data: [502, 635, 809, 947, 1402, 3634, 5268]
    },]
  }

  content = '';
  private roles: string[];
  isLoggedIn = false;
  username: string;
  id: string;
  tickets = null;
  ticket: any = {};
  user = null;
  ticket_id: number;
  isAddMode: boolean;
  titre: any;


  constructor(private TicketService: TicketService,
    private userService: UtilisateurService, private ticketservice: TicketService, private tokenStorageService: TokenStorageService, private route: ActivatedRoute,
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

    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

    Highcharts.chart('container', this.options);
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
