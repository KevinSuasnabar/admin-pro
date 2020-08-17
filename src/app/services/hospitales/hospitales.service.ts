import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2'
import { Hospital } from 'src/app/models/hospital.model';

@Injectable()
export class HospitalesService {

  url = URL_SERVICIOS;
  totalHospitales: number = 0;

  constructor(private http: HttpClient,
    private _usuarioService: UsuarioService) { }

  cargarHospitales() {
    return this.http.get(this.url + '/hospital').pipe(
      map((resp: any) => {
        this.totalHospitales = resp.total;
        return resp.hospitales;
      })
    )
  }

  obtenerHospital(id: string) {
    return this.http.get(this.url + '/hospital/' + id).pipe(
      map((resp: any) => {
        return resp.hospital;
      })
    )
  }

  borrarHospital(id: string) {
    return this.http.delete(this.url + '/hospital/' + id + '?token=' + this._usuarioService.token).pipe(
      map(res => {
        Swal.fire({
          title: 'Hospital borrado',
          text: 'Eliminado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      })
    )
  }

  crearHospital(nombre: string) {
    return this.http.post(this.url + '/hospital?token=' + this._usuarioService.token, { nombre: nombre }).pipe(
      map((resp: any) => {
        return resp.hospital
      })
    )
  }

  buscarHospital(termino: string) {
    return this.http.get(this.url + '/busqueda/coleccion/hospitales/' + termino).pipe(
      map((resp: any) => {
        return resp.hospitales;
      })
    )
  }

  actualizarHospital(hospital: Hospital) {
    return this.http.put(this.url + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token, hospital).pipe(
      map((resp: any) => {
        Swal.fire({
          title: 'Hospital actualizado',
          text: hospital.nombre,
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        return resp.hospital;
      })
    )
  }

}
