import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public showPassword: boolean = false;
  public showConfirm: boolean = false;

  constructor() {}

  ngOnInit() {}
}
