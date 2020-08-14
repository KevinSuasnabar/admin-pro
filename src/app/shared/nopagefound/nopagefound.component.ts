import { Component, OnInit } from '@angular/core';
declare function init_plugins(); //funcion jquery que esta en assets/js/custom para el correcto funcionamiento de las animacions del dashborad

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    init_plugins();
  }

}
