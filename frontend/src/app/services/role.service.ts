import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private env: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this.env = environment.APP_URL;
  }

  //Es como si estuvieramos en postman pero version Angular
  registerRole(role: any) {
    //Return es como el send de postman
    return this._http.post<any>(this.env + 'role/registerRole', role);
  }
}
