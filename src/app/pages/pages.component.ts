import { Component, OnInit } from '@angular/core';

//llamada cualquier script fuera de angular (hechas en jquery,etc)
declare function init_plugins(); //funcion jquery que esta en assets/js/custom para el correcto funcionamiento de las animacions del dashborad

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
