import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';
import { TokenStorageService } from '../_service/token-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  utilisateur: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  currentUser: any;
  status = false;



  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.status = this.tokenStorage.getUser().status;
    }
  }

  onSubmit(form) {
    console.log('*********************form', form)
    console.log('*********************this.utilisateur', this.utilisateur)
    this.authService.login(this.utilisateur).subscribe(
      data => {

        const link1 = ['/user'];
        const link2 = ['/admin'];
        const link3 = ['/technicien'];
        const link4 = ['/login'];
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.currentUser = data;
        if (this.currentUser.roles.includes('ROLE_USER')) { this.router.navigate(link1); }
        else
          if (this.currentUser.roles.includes('ROLE_ADMIN')) { this.router.navigate(link2); }
          else
            if (this.currentUser.roles.includes('ROLE_TECHNICIEN')) { this.router.navigate(link3); }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
    this.ngOnInit();
  }

  reloadPage() {
    window.location.reload();
  }
}
