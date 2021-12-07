import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Route, Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.loginData = {};
  }

  ngOnInit(): void {
  }

  login() {
    if (
      //Los estamos sacando del HTML
      //Si los datos estan vacios
      !this.loginData.email ||
      !this.loginData.password
    ) {
      //Mostramos el mensaje del error
      this.message = 'Failed process: Incomplete Data';
      this.openSnackBarError();
    } else {
      //Si todos los datos llegaron correctamente
      //Primero le enviamos los datos al servicio para que lo envie al backend
      this._userService.login(this.loginData).subscribe({
        next: (v) => {
          //Para guardar un objeto y que nos traiga el objeto que seria el token
          localStorage.setItem('token', v.token);
          //Si todo sale bien y se registro en backend
          this._router.navigate(['/listTask'])
        },
        error: (e) => {
          this.message = e.error.message;
          this.openSnackBarError();
        }
      });
    }
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      //Nombre de la variable / Parametro que le colocamos
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackbarFalse'],
    });
  }
}
