import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private ngxUiLoaderService: NgxUiLoaderService) {}


  async presentLoading() {
    this.ngxUiLoaderService.start()

   /* const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    //console.log('Loading dismissed!');*/
  }

  async cerrar(){
   // this.loadingController.dismiss()
   this.ngxUiLoaderService.stop()

  }
  
}
