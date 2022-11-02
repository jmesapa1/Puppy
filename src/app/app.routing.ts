import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { ClienteLayoutComponent } from './layouts/cliente-layout/cliente-layout.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'cliente',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],

    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x=>x.AdminLayoutModule)
  }

]},

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ],
  },
  {
    path: 'cliente',
    component: ClienteLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/cliente-layout/cliente-layout.module').then(m => m.ClienteLayoutModule)
      }
    ],
  },
  
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
