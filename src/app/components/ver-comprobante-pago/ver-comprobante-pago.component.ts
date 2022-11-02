import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploader } from 'ng2-file-upload';
import { PagosService } from '../../services/pagos/pagos.service';
import { AlertasService } from '../../services/alertas/alertas.service';

@Component({
  selector: 'app-ver-comprobante-pago',
  templateUrl: './ver-comprobante-pago.component.html',
  styleUrls: ['./ver-comprobante-pago.component.css']
})
export class VerComprobantePagoComponent implements OnInit {
  menuItems: any[];

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
  constructor(public dialogRef: MatDialogRef<VerComprobantePagoComponent>,private pagosService:PagosService,private alertasService:AlertasService,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
      console.log("INFORMACION DEL PAGO",data)
      this.dataAux=data.pago
      
  }

  ngOnInit() {
  }
 
  cancelar(val) {
    this.dialogRef.close(val);
  }

}
