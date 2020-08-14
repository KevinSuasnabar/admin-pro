import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[];
  desde: number;

  totalRegistros: number;
  cargando: boolean;

  constructor(private usuariosService: UsuarioService,
    private modalUploadService: ModalUploadService) {
    this.usuarios = [];
    this.desde = 0;
    this.totalRegistros = 0;
    this.cargando = true;
  }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notificacion.subscribe(data => {
      //recargamos la pagina actual para que se visualize la foto
      this.cargarUsuarios();//me posisicona en la pagina actual porque la variable 'desde' no cambia
    })
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {

    this.cargando = true;

    this.usuariosService.cargarUsuarios(this.desde).subscribe((data: any) => {
      this.totalRegistros = data.total;
      this.usuarios = data.usuarios;
      this.cargando = false;

    });
  }

  //paginacion simple
  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    console.log(desde);


    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();


  }

  buscarUsuario(termino: string) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this.usuariosService.buscarUsuarios(termino).subscribe(data => {
      this.usuarios = data;
      this.cargando = false;

    })
  }

  borrarUsuario(usuario: Usuario) {
    //el usuario logeando nose puede borrar a si mismo
    if (usuario._id === this.usuariosService.usuario._id) {
      Swal.fire({
        title: 'No se puede borrar usuario',
        text: 'No te puedes borrar a ti mismo',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }

    //ventana de confirmacion de borrado
    Swal.fire({
      title: 'Estas seguro?',
      text: "Esta a punto de borrar a " + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,borrar!',
      cancelButtonText: 'No, retroceder!'

    }).then((borrar) => {
      //false
      console.log(borrar)


      if (borrar.value) {//true
        this.usuariosService.borrarUsuario(usuario._id).subscribe(data => {
          console.log(data);
          this.desde = 0;
          this.cargarUsuarios();
        });

      }
    })
  }

  guardarUsuario(usuario: Usuario) {
    this.usuariosService.actualizarUsuario(usuario).subscribe(data =>
      console.log(data));
  }

}
