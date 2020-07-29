import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable()
export class SubirArchivoService {

  url = URL_SERVICIOS;


  constructor() { }


  subirArchivo(archivo: File, tipo: string, id: string) {
    //vanilla javascript
    return new Promise((resolve, reject) => {
      //se hara por ajax
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {//cuando termine el proceso

          if (xhr.status === 200) {//correcto
            console.log('imagen subida');
            resolve(JSON.parse(xhr.response)); //resolvemos la promesa
          } else {
            console.log('Fallo la subida');
            reject(xhr.response);//resolvemos el error
          }
        }
      };

      let url = this.url + '/upload/' + tipo + '/' + id;

      //envio de la peticion ajax
      xhr.open('PUT', url, true);//('tipo de peticion','url','si es sincrono o no')
      xhr.send(formData);
    })
  }
}
