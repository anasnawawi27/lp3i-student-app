import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public type: string = 'password';
  public icon: string = 'eye-outline';

  public showPassword: boolean = false;

  constructor() {}

  ngOnInit() {}
}
