import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription;

  constructor() {
    this.subscripcion = this.regresaObservable().subscribe(data => {
      console.log('subs: ', data)//data
    }, error => {
      console.log('Error: ', error)//error
    }, () => {
      console.log('El observador termino!')//fin
    });
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    console.log('Cerraste la pagina rxjs')
    this.subscripcion.unsubscribe();//nos desus
  }

  regresaObservable(): Observable<any> {
    return new Observable(observable => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;

        const salida = {
          valor: contador
        }

        observable.next(salida);
        if (contador === 3) {
          observable.complete();//finalizamos el flujo
        }
        // if (contador === 2) {
        //   //clearInterval(intervalo);
        //   observable.error('Hubo un error!')
        // }
      }, 1000);
    }).pipe(
      map((resp: any) => {
        return resp.valor
      }),
      filter((data: number) => {
        if ((data % 2) === 1) {
          return true;
        } else {
          return false;
        }
      }));
  }

}
