import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public loginForm: FormGroup; 
  public loggedIn: boolean;

  constructor(private authService: AuthService, private fb: FormBuilder) { 

    this.loggedIn = this.authService.loggedIn;
  }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.pattern('admin')]],
      password: ['', [Validators.required, , Validators.pattern('admin')]]
    });
  }

  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onLogin() {
    this.authService.login();
    this.loggedIn = this.authService.loggedIn;
  }

  onLogout() {
    this.authService.logout();
    this.loggedIn = this.authService.loggedIn;
  }

  onSubmit() {
    this.onLogin();
  }

}
