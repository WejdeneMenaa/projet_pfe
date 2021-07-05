import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_service/token-storage.service';
import { Utilisateur } from 'src/app/_models/utilisateur';
import { UtilisateurService } from 'src/app/_service/utilisateur.service';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser = null;
  utilisateur: Utilisateur;
  users = null;
  private roles: string[];
  isLoggedIn = false;
  username: string;
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  user : any = {};

  constructor(private token: TokenStorageService,
    private UtilisateurService: UtilisateurService,
    private router: Router,
    private route: ActivatedRoute,


  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.UtilisateurService.get(localStorage.getItem('id')).subscribe((data) => {
        this.user = data
        console.log("user" + this.user)
    })
    this.currentUser = this.token.getUser();
    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }
  }
}