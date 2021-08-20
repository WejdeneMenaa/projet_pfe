import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../_service/utilisateur.service';
import { TokenStorageService } from '../_service/token-storage.service';
import * as Highcharts from 'highcharts';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { TicketService } from '../_service/ticket.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  public doughnutChartLabels: Label[] = ['Tickets En cours', 'Tickets Résolus', 'Tickets Cloturés'];

  public doughnutChartData: MultiDataSet = [[0, 0, 0]];

  public doughnutChartType: ChartType = 'doughnut';

  resolus;
  clotures;
  encours;

  content = '';
  private roles: string[];
  isLoggedIn = false;
  username: string;
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
    }, ]
  }

  constructor(private userService: UtilisateurService, private ticketservice: TicketService, private tokenStorageService: TokenStorageService) { }

  ngOnInit() {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    Highcharts.chart('container', this.options);
    this.ticketservice.getTicketByStatut("Resolu").subscribe(element => {
      this.resolus = element['rows'][0]['count'];

      this.ticketservice.getTicketByStatut("Cloture").subscribe(element1 => {
        this.clotures = element1['rows'][0]['count'];

        this.ticketservice.getTicketByStatut("En cours").subscribe(element2 => {
          this.encours = element2['rows'][0]['count'];

          this.doughnutChartData = [
            [Number(this.resolus), Number(this.clotures), Number(this.encours)],]

        })

      })

    })




  }
}