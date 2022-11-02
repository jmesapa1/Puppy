import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    mostrar:boolean
}
export const ROUTES: RouteInfo[] = [
  { path: '/cliente/buscador-cliente', title: 'Buscador',  icon:'design_bullet-list-67', class: '',mostrar:true },

   { path: '/cliente/simulador', title: 'Simulador',  icon:'design_bullet-list-67', class: '',mostrar:true },

];

@Component({
  selector: 'app-sidebar-cliente',
  templateUrl: './sidebar-cliente.component.html',
  styleUrls: ['./sidebar-cliente.component.css']
})
export class SidebarClienteComponent implements OnInit {
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
