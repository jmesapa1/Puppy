import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploader } from 'ng2-file-upload';
import { PagosService } from '../../services/pagos/pagos.service';
import { AlertasService } from '../../services/alertas/alertas.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {
  menuItems: any[];
  descripcion
  detalleInversion
  detallePago
  detalleUsuario

  uploader: any;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response
  archivoCargado = false
  documentos = []
  archivo
  dataAux
  constructor(public dialogRef: MatDialogRef<ResumenComponent>, private pagosService: PagosService, private alertasService: AlertasService,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    console.log("INFORMACION DEL PAGO", data)
    this.dataAux = data
    this.detalleInversion = this.data.dataInversion.detalleInversion.data
    this.detalleInversion.id = this.data.dataInversion.detalleInversion.id
    this.detallePago = this.data.pago
    this.detalleUsuario = this.data.dataInversion.usuario


  }

  ngOnInit() {
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  };


  cancelar(val) {
    this.dialogRef.close(val);
  }

}
