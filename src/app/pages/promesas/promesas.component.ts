import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contar3().then((data) => console.log('termino',data)).catch(error => console.error('Error en la promesa', error))
  }

  ngOnInit(): void {
  }

  contar3(): Promise<boolean> {//reporta una promesa
    return new Promise((resolve, reject) => {
      let contador = 0
      let intervalo = setInterval(() => {
        contador += 1;
        if (contador === 3) {
          resolve(true);
          clearInterval(intervalo);
        }
      }, 1000)
    });

  }

}
