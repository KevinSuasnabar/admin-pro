import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';


declare function init_plugins(); //funcion jquery que esta en assets/js/custom para el correcto funcionamiento de las animacions del dashborad


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css'],
  styles: []
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(private _usuarioService: UsuarioService,
    private router: Router) { }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null //pasa la validacion
      }

      return {
        sonIguales: true //no pasa la validacion
      };

    };
  }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      password2: new FormControl(null, [Validators.required]),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales('password', 'password2') });

    //llenando datos al form para pruebas
    this.forma.setValue({
      nombre: 'Kevin',
      correo: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    })

  }

  registrarUsuario() {

    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {
      Swal.fire({
        title: 'Imporante',
        text: 'Debe aceptar los terminos!',
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password,
    );

    this._usuarioService.crearUsuario(usuario).subscribe(data => {
      console.log(data);
      this.router.navigate(['/login']);
    });

    console.log(this.forma.value)
  }

}
