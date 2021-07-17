import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/_models/utilisateur';
import { TokenStorageService } from '../_service/token-storage.service';


@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {

  utilisateur: Utilisateur;
  users = null;
  roles: string[];
  isLoggedIn = false;
  username: string;
  id: string;
  user = null;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      this.roles = this.user.roles;
      this.username = this.user.username;
      this.id = this.user.id;
      localStorage.setItem('id', this.id);

    }
  }
}
