import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_service/account.service';

@Component({
  selector: 'app-afficherutilisateur',
  templateUrl: './afficherutilisateur.component.html',
  styleUrls: ['./afficherutilisateur.component.css']
})
export class AfficherutilisateurComponent implements OnInit {
accounts:any;
  constructor(
    private accountservice: AccountService
  )
  
  { }

  ngOnInit(): void {
    this.accountservice.getAccounts().subscribe((data)=> {
this.accounts = data
    })

  }

}
