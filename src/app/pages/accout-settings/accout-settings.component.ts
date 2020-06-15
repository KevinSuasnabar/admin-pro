import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {

  constructor(private ajustes: SettingsService) { }

  ngOnInit(): void {
    this.colorcarCheck();
  }

  cambiarColor(tema: string, link: any) {//cambia color de la plantilla

    this.aplicarCheck(link);
    this.ajustes.aplicarTema(tema);

  }

  aplicarCheck(link: any) {
    let selectores: any = document.getElementsByClassName('selector');

    for (let ref of selectores) {
      ref.classList.remove('working'); //limpiamos la clase que pone el check
    }

    link.classList.add('working');//asignamos  el check al boton seleccionado

  }

  colorcarCheck() {
    let selectores: any = document.getElementsByClassName('selector');
    let tema = this.ajustes.ajustes.tema;

    for (let ref of selectores) {
      if (ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');//asignamos  el check al boton seleccionado
        break;
      }
    }
  }

}
