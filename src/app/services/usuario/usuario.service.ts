import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {

  url = URL_SERVICIOS;

  usuario: Usuario;
  token: string;

  constructor(private http: HttpClient, private router: Router) {
    this.cargarStorage();
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {

      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  loginGoogle(token: string) {

    return this.http.post(this.url + '/login/google', { token: token }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(this.url + '/login', usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;

      })
    );
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  crearUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(this.url + '/usuario', usuario).pipe(
      map((resp: any) => {
        Swal.fire({
          title: 'Usuario Creado',
          text: usuario.email,
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        return resp.usuario;
      })
    );
  }
}
