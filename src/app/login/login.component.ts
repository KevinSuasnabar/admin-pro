import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function init_plugins(); //funcion jquery que esta en assets/js/custom para el correcto funcionamiento de las animacions del dashborad

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css'],
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    init_plugins();
  }

  ingresar(){
    this.router.navigate(['/dashboard']);
  }

}
