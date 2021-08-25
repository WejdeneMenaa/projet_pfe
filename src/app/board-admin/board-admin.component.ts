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
  public doughnutChartLabels: Label[] = ['Tickets Nouveaux', 'Tickets En cours', 'Tickets Résolus', 'Tickets Cloturés'];
  public doughnutChartData: MultiDataSet = [[0, 0, 0,0]];
  public doughnutChartType: ChartType = 'doughnut';
  a = new Date();
  nouveaux;
  encours;
  resolus;
  clotures
  dayofthisMonth: any[] = [];
  date;
  options: any = {
    Chart: {
      type: 'area',
      height: 700
    },
    title: {
      text: 'Nombre des tikets Par Jour'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: [0, 0, 0, 0, 0, 0, 0],
      tickmarkPlacement: 'on',
      title: {
        enabled: false
      }
    },
    series: [{
      name: 'Tikets',
      data: [0, 0, 0, 0, 0, 0, 0]
    },]
  }
  counttiket: any[] = [];
  c = new Date();
  content = '';
  private roles: string[];
  isLoggedIn = false;
  username: string;
  id: string;

  constructor(private userService: UtilisateurService, private ticketservice: TicketService, private tokenStorageService: TokenStorageService) { }

  ngOnInit() {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.id = user.id;
      localStorage.setItem('id', this.id);
    }
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );


    this.ticketservice.getTicketByStatut("Nouveau").subscribe(element => {
      this.nouveaux = element['rows'][0]['count'];

      this.ticketservice.getTicketByStatut("En cours").subscribe(element1 => {
        this.encours = element1['rows'][0]['count'];

        this.ticketservice.getTicketByStatut("Resolu").subscribe(element2 => {
          this.resolus = element2['rows'][0]['count'];

          this.ticketservice.getTicketByStatut("Cloture").subscribe(element3 => {
            this.clotures = element3['rows'][0]['count'];
            this.doughnutChartData = [
              [Number(this.nouveaux), Number(this.encours), Number(this.resolus),Number(this.clotures)]]
          })
        })
      })
    })
    for (var i = 1; i <= this.getDayOfmonth(this.a.getMonth(), this.a.getFullYear()); i++) {
      this.dayofthisMonth.push(i);
    }
    // for(var i=0;i<this.dayofthisMonth.length;i++){
    //   console.log(this.dayofthisMonth[i])
    // }

    this.ticketservice.getTicketByDate().subscribe(element4 => {
      this.date = element4;
      for (var t of this.dayofthisMonth) {
        var u = 0;

        for (var a of this.date['rows']) {
          this.c = new Date(a['date_creation']);
          if (this.c.getDate() == t) {
            u++;

          }
        }
        this.counttiket.push(u);
      }
      this.options.xAxis.categories = this.dayofthisMonth;
      this.options.series = [{
        name: 'Tikets',
        data: this.counttiket
      },]
      Highcharts.chart('container', this.options);
    })



  }
  getDayOfmonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }
}