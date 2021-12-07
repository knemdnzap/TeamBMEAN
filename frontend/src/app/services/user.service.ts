import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private env: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this.env = environment.APP_URL;
  }

  //Es como si estuvieramos en postman pero version Angular
  registerUser(user: any) {
    //Return es como el send de postman
    return this._http.post<any>(this.env + 'user/registerUser', user);
  }

  login(user: any) {
    //Return es como el send de postman
    return this._http.post<any>(this.env + 'user/login', user);
  }

  loggedIn (){
    //Cuando quiero que me devuelva un boolean solo true false
    //Truco para uso de un if/condicional para los booleanos/ para ahorrarnos un if/else
    //Si no esta el token devuelveme un false y si si esta que devuelva true
    return !!localStorage.getItem('token')
  }

  getToken (){
    return localStorage.getItem('token')
  }

  logout () {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
