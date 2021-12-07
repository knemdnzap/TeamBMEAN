import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {}

  canActivate(): boolean {
    if (!this._userService.loggedIn()) {
      //Si no hay un token en localStorage entonces redirijanos al login
      this._router.navigate(['/login']);
      return false;
    } else {
      //En caso de exito
      return true;
    }
  }
}
