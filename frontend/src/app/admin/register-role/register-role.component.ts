import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-role',
  templateUrl: './register-role.component.html',
  styleUrls: ['./register-role.component.css']
})
export class RegisterRoleComponent implements OnInit {
  registerData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _roleService: RoleService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerData = {};
  }

  ngOnInit(): void {
  }

  registerRole() {
    if (
      //Los estamos sacando del HTML
      //Si los datos estan vacios
      !this.registerData.name ||
      !this.registerData.description
    ) {
      //Mostramos el mensaje del error
      this.message = 'Failed process: Incomplete Data';
      this.openSnackBarError();
    } else {
      //Si todos los datos llegaron correctamente
      //Primero le enviamos los datos al servicio para que lo envie al backend
      this._roleService.registerRole(this.registerData).subscribe({
        next: (v) => {
          //Si todo sale bien y se registro en backend
          this._router.navigate(['/saveTask'])
          this.message = 'Successfull role registration'
          //Para mostrar el mensaje de que fue exitoso
          this.openSnackBarSuccesfull();
        },
        error: (e) => {
          this.message = e.error.message;
          this.openSnackBarError();
        }
      });
    }
  }

  //Para las barritas de mensajes
  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      //Nombre de la variable / Parametro que le colocamos
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackbarTrue'],
    });
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
