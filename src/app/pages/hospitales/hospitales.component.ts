import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalesService } from 'src/app/services/service.index';
import Swal from 'sweetalert2'
import { URL_SERVICIOS } from 'src/app/config/config';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];


  constructor(public _hospitalService: HospitalesService,
    public _modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(data => {
      this.cargarHospitales();
    });
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales().subscribe(data => {
      this.hospitales = data;
    })
  }

  guardarHospital(hospital: Hospital) {

    this._hospitalService.actualizarHospital(hospital).subscribe(() => {

    })
  }

  borrarHospital(hospital: Hospital) {
    this._hospitalService.borrarHospital(hospital._id).subscribe(() => {
      this.cargarHospitales();
    })
  }

  buscarHospital(termino: string) {

    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospital(termino).subscribe(data => {
      this.hospitales = data;
    })
  }

  crearHospital() {
    let url = URL_SERVICIOS;
    let termino: string;

    Swal.fire({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      confirmButtonText: 'Ok'
    }).then(valor => {

      console.log(valor.value.toString())

      if (!valor.value) {
        return;
      }

      this._hospitalService.crearHospital(valor.value.toString()).subscribe(data => {
        this.cargarHospitales();
      })

    })
  }

  actualizarImagen(hospital: Hospital) {
    this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }

}
