import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NumbersOnlyDirective } from './directive/numbers-only.directive';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoaderInterceptor } from './services/Interceptors/loader.interceptor';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ClienteLayoutModule } from './layouts/cliente-layout/cliente-layout.module';
import { ClienteLayoutComponent } from './layouts/cliente-layout/cliente-layout.component';
import { CurrencyMaskModule } from "ng2-currency-mask";

const firebaseConfig = {
  apiKey: "AIzaSyAAS45hgR2OsOmFlHOzSXFdDyundHvJZBI",
  authDomain: "fondoinversion-ebdd1.firebaseapp.com",
  databaseURL: "https://fondoinversion-ebdd1-default-rtdb.firebaseio.com",
  projectId: "fondoinversion-ebdd1",
  storageBucket: "gs://fondoinversion-ebdd1.appspot.com",
  messagingSenderId: "245052502696",
  appId: "1:245052502696:web:741622be8d99ca5d07089d",
  measurementId: "G-D31BZE81JW",
  
};

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#FFFFFF',
  bgsOpacity: 0.5,
  bgsPosition: 'bottom-right',
  bgsSize: 60,
  bgsType: 'ball-spin-clockwise',
  blur: 5,
  delay: 0,
  fastFadeOut: true,
  fgsColor: '#FFFFFF',
  fgsPosition: 'center-center',
  fgsSize: 60,
  fgsType: 'ball-scale-multiple',
  gap: 24,
  logoPosition: 'center-center',
  logoSize: 250,
  logoUrl: 'assets/img/mh_transparente.png',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: '#FFFFFF;',
  pbColor: '#FFFFFF',
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: true,
  text: '',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 300,
};

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    CurrencyMaskModule,

    NgbModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ClienteLayoutComponent
    

  ],
  providers: [{provide:LocationStrategy,useClass:HashLocationStrategy},
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
