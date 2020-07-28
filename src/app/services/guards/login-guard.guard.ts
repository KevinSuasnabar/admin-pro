import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(private _usuarioService: UsuarioService,
    private router: Router) {

  }

  canActivate() {

    if (this._usuarioService.estaLogueado()) {
      console.log('Paso el guard');
      return true;
    } else {
      console.log('Bloueado  por el guard');
      this.router.navigate(['/login']);
      return false;
    }
  }

}
