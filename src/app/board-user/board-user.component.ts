import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/_models/utilisateur';
import { TokenStorageService } from '../_service/token-storage.service';
import * as Highcharts from 'highcharts';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { TicketService } from '../_service/ticket.service';
import { DialogService } from 'src/app/_service/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {

  public doughnutChartLabels: Label[] = ['Tickets Résolus','Tickets Cloturés','Tickets En cours'];
  public doughnutChartData: MultiDataSet = [[0, 0, 0]];
  public doughnutChartType: ChartType = 'doughnut';

  resolus;
  clotures;
  encours;


  users = null;
  isLoggedIn = false;
  username: string;
  id: string;
  user = null;
  tickets = null;
  ticket: any = {};
  private roles: string[];
  ticket_id: number;
  isAddMode: boolean;
  titre: any;

  constructor(
    private TicketService: TicketService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogservice: DialogService) { }

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

    this.TicketService.getTicketByStatut("Resolu").subscribe(element => {
      this.resolus = element['rows'][0]['count'];

      this.TicketService.getTicketByStatut("Cloture").subscribe(element1 => {
        this.clotures = element1['rows'][0]['count'];

        this.TicketService.getTicketByStatut("En cours").subscribe(element2 => {
          this.encours = element2['rows'][0]['count'];

          this.doughnutChartData = [
            [Number(this.resolus), Number(this.clotures), Number(this.encours)],]

        })
      })
    })
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
