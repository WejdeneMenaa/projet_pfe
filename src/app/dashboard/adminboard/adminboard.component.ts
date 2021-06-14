import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/_service/utilisateur.service';

@Component({
  selector: 'app-adminboard',
  templateUrl: './adminboard.component.html',
  styleUrls: ['./adminboard.component.css']
})
export class AdminboardComponent implements OnInit {

  content = '';

  constructor(private UtilisateurService: UtilisateurService) { }

  ngOnInit() {
    this.UtilisateurService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}

