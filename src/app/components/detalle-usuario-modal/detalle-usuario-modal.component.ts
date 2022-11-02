import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-detalle-usuario-modal',
  templateUrl: './detalle-usuario-modal.component.html',
  styleUrls: ['./detalle-usuario-modal.component.css']
})
export class DetalleUsuarioModalComponent implements OnInit {
  menuItems: any[];

  dataObject

  constructor(public dialogRef: MatDialogRef<DetalleUsuarioModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.dataObject = this.data
      console.log(this.dataObject)
  }

  ngOnInit() {
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  };

  enviarMensaje(){
    window.open("https://web.whatsapp.com/send?phone="+this.data.whatsapp,"_blank")
  }
}
