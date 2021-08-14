import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../_service/utilisateur.service';
import { TokenStorageService } from '../_service/token-storage.service';


@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  content = '';
  private roles: string[];
  isLoggedIn = false;
  username: string;
  donutChartData = [
    {
      label: 'Liverpool FC',
      value: 5,
      color: 'red',
      
    },
    {
      label: 'Real Madrid	',
      value: 13,
      color: 'black',
    },
    {
      label: 'FC Bayern München',
      value: 5,
      color: 'blue',
    },
  ];
  constructor(private userService: UtilisateurService, private tokenStorageService: TokenStorageService) { }

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
  }
}