import { Component, OnInit,ViewChild,
  ElementRef,
  TemplateRef,
  NgZone,
  Output } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {FormGroup,FormBuilder,FormControl,Validators,NgModel} from '@angular/forms';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import Login from '../model/Login';
import Token from '../model/Token';
import { Emails } from '../model/Email';
import {ManagementService} from '../management.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user: SocialUser;
  loggedIn: boolean;
 public email: any[];
  photoUrl: string;
  req: Login;
  id:SocialUser;
  
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: SocialAuthService,
    private managementService: ManagementService
    
  ) {
    
   }
  

  ngOnInit() {
    
    
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    })
  }

 
  

  
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);

    this.authService.authState.subscribe((user) => {
      this.req = { email: user.email };
      this.managementService.login(this.req).subscribe(
        (token: Token) => {
          localStorage.setItem('user', JSON.stringify(token));
          this.router.navigate(['homepage']);
        },
        (error) => {
          this.managementService.success('Invalid User!');
          window.location.reload();
        }
      );
    });
  }

  signOut(): any {
    this.authService.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }


}
