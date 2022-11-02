import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    mostrar:boolean
}
export const ROUTES: RouteInfo[] = [
    { path: '/usuarios', title: 'Inversionistas',  icon:'design_bullet-list-67', class: '',mostrar:true },
    { path: '/pagos', title: 'Pagos',  icon:'design_bullet-list-67', class: '',mostrar:true },
    { path: '/simulador', title: 'Simulador',  icon:'design_bullet-list-67', class: '',mostrar:true },

    { path: '/usuario-inversiones', title: 'Listado de inversiones',  icon:'users_single-02', class: '', mostrar:false },
    { path: '/detalle-pago', title: 'Listado de pagos',  icon:'users_single-02', class: '', mostrar:false },
    { path: '/detalle-inversion', title: 'Gestión de inversión',  icon:'users_single-02', class: '', mostrar:false },

    { path: '/detalle-usuario', title: 'Gestión de usuario',  icon:'users_single-02', class: '', mostrar:false },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
