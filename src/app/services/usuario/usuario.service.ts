import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class UsuarioService {

  url = URL_SERVICIOS;

  usuario: Usuario;
  token: string;

  constructor(private http: HttpClient,
    private router: Router,
    private _subirArchivoService: SubirArchivoService) {
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

  actualizarUsuario(usuario: Usuario) {
    return this.http.put(this.url + '/usuario/' + usuario._id + '?token=' + this.token, usuario).pipe(
      map((resp: any) => {
        //this.usuario = resp.usuario;//actualizado con los nuevos datos pero ya esta seteado en una funcion guardarStorage
        
        if(usuario._id === this.usuario._id){
          let usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
          
        }
        
        Swal.fire({
          title: 'Usuario actualizado',
          text: usuario.nombre,
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        return true;
      })
    );
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {

        this.usuario.img = resp.usuario.img;
        Swal.fire({
          title: 'Imagen actualizada',
          text: this.usuario.nombre,
          icon: 'success',
          confirmButtonText: 'Ok'
        });

        this.guardarStorage(id, this.token, this.usuario);

      })
      .catch(resp => {
        console.log(resp)
      })
  }

  cargarUsuarios(desde: number = 0) {
    return this.http.get(this.url + '/usuario?desde=' + desde);
  }

  buscarUsuarios(termino: string) {
    return this.http.get(this.url + '/busqueda/coleccion/usuarios/' + termino).pipe(
      map((resp: any) => (resp.usuarios) as Usuario[])
    );
  }

  borrarUsuario(id: string) {
    return this.http.delete(this.url + '/usuario/' + id + '?token=' + this.token).pipe(
      map((resp: any) => {
        Swal.fire(
          'Eliminado!',
          'Usuario eliminado satisfactoriamente!.',
          'success'
        );
        return true;
      })
    );
  }

}
