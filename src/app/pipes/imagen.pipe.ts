import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  url = URL_SERVICIOS;

  transform(img: string, tipo: string = 'usuario'): unknown {

    let endpoint = this.url + '/img';

    if (!img) {
      return endpoint + '/usuarios/xxx'; //imagen por defecto
    }

    if (img.indexOf('https') >= 0) {
      return img; // imagen de google
    }

    switch (tipo) {
      case 'usuario':
        endpoint += '/usuarios/' + img;
        break;
      case 'medico':
        endpoint += '/medicos/' + img;
        break;
      case 'hospital':
        endpoint += '/hospitales/' + img;
        break;
      default:
        console.log('tipo de imagen no existe, usuario ,medicos ,hospitales');
        endpoint += '/usuarios/xxx'; //imagen por defecto
    }

    return endpoint;
  }

}
