import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @Input() leyenda: string = 'Leyenda';
  @Input() porcentaje: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  @ViewChild('txtporcentaje') txtporcentaje:ElementRef;//obtenemos la refrencia de un elemto del dom


  constructor() { }

  ngOnInit() {
  }

  cambiarValor(valor: number) {//cambia el valor de 5 en 5
    if (this.porcentaje >= 100 && valor > 0) {
      this.porcentaje = 100;
      return;
    }
    if (this.porcentaje <= 0 && valor < 0) {
      this.porcentaje = 0;
      return;
    }
    this.porcentaje = this.porcentaje + valor;

    this.cambioValor.emit(this.porcentaje);//pasamos el valor al padre

  }

  //cuando cambia el input
  onChange(event) {

    if (event >= 100) this.porcentaje = 100;
    else if (event <= 0) this.porcentaje = 0;
    else this.porcentaje = event;

    this.txtporcentaje.nativeElement.value=this.porcentaje;

    this.cambioValor.emit(this.porcentaje);//pasamos el valor al padre

    this.txtporcentaje.nativeElement.focus();//le damos el efecto de foco sobre el elemento seleccionado
  }


}
