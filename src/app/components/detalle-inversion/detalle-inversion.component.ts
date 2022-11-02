import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  mostrar: boolean
}
export const ROUTES: RouteInfo[] = [
  { path: '/usuarios', title: 'Inversionistas', icon: 'design_bullet-list-67', class: '', mostrar: true },
  { path: '/pagos', title: 'Pagos', icon: 'design_bullet-list-67', class: '', mostrar: true },

  { path: '/usuario-inversiones', title: 'Listado de inversiones', icon: 'users_single-02', class: '', mostrar: false },
  { path: '/detalle-pago', title: 'Listado de pagos', icon: 'users_single-02', class: '', mostrar: false },
  { path: '/detalle-inversion', title: 'Gestión de inversión', icon: 'users_single-02', class: '', mostrar: false },

  { path: '/detalle-usuario', title: 'Gestión de usuario', icon: 'users_single-02', class: '', mostrar: false },

];

@Component({
  selector: 'app-detalle-inversion',
  templateUrl: './detalle-inversion.component.html',
  styleUrls: ['./detalle-inversion.component.css']
})
export class DetalleInversionModalComponent implements OnInit {
  menuItems: any[];

  dataObject

  constructor(public dialogRef: MatDialogRef<DetalleInversionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.dataObject = this.data

    this.dataObject.ID_INVERSION=this.dataObject.data.id_inversion.split("Inversiones/")[1]
      console.log(this.dataObject)
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  };
}
