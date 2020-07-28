import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins(); //funcion jquery que esta en assets/js/custom para el correcto funcionamiento de las animacions del dashborad
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  styles: []
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(private router: Router,
    private _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {

    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '224590843704-qklqb12bijg75v1gbgola3drcr69tp34.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email',
      });

      this.attachSignin(document.getElementById('btnGoogle'))
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {

      //let profile = googleUser.getBasicProfile();

      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token).subscribe(data => {
        //para el problema de los estilos no es de mucha importancia
        window.location.href = '#/dashboard';//redireccion manual
        //this.router.navigate(['/dashboard']);
      })

      console.log(token);

    });
  }

  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame).subscribe(data => {
      console.log(data);
      this.router.navigate(['/dashboard']);
    })

    console.log(forma.valid);
    console.log(forma.value);

    //this.router.navigate(['/dashboard']);
  }

}
