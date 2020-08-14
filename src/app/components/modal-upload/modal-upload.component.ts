import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/service.index';
import Swal from 'sweetalert2'
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: any;

  constructor(private subirArchivoService: SubirArchivoService,
    public modalUploadService: ModalUploadService) { }

  ngOnInit() {
  }

  subirImagen(){
    this.subirArchivoService.subirArchivo(this.imagenSubir,this.modalUploadService.tipo,this.modalUploadService.id)
    .then(resp=>{
      console.log("-----",resp);
      this.modalUploadService.notificacion.emit(resp);
      this.cerrarModal();

    }).catch(err=>{
        console.log('error en la carga...')
    });
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this.modalUploadService.ocultarModal();
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    //validar si es una imagen
    if (archivo.type.indexOf('image') < 0) {
      Swal.fire({
        title: 'Solo imagens',
        text: 'El archivo seleccionado no es una imagen',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;


  }

}
