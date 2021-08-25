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
  p: number = 1;
  a = new Date();
  nouveaux;
  encours;
  resolus;
  dayofthisMonth: any[] = [];
  date;
  options: any = {
    Chart: {
      type: 'area',
      height: 700
    },
    title: {
      text: 'Tikets résolus par jour'
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
      name: 'Tikets résolus',
      data: [0, 0, 0, 0, 0, 0, 0]
    },]
  }
  counttiket: any[] = [];
  c = new Date();

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

    for (var i = 1; i <= this.getDayOfmonth(this.a.getMonth(), this.a.getFullYear()); i++) {
      this.dayofthisMonth.push(i);
    }
    // for(var i=0;i<this.dayofthisMonth.length;i++){
    //   console.log(this.dayofthisMonth[i])
    // }

    this.ticketservice.getTicketByDateAndStatut("Resolu").subscribe(element3 => {
      this.date = element3;
      for (var t of this.dayofthisMonth) {
        var u = 0;

        for (var a of this.date['rows']) {
          this.c = new Date(a['date_echeance']);
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
