import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploader } from 'ng2-file-upload';
import { PagosService } from '../../services/pagos/pagos.service';
import { AlertasService } from '../../services/alertas/alertas.service';

@Component({
  selector: 'app-carga-comprobante-pago',
  templateUrl: './carga-comprobante-pago.component.html',
  styleUrls: ['./carga-comprobante-pago.component.css']
})
export class CargaComprobantePagoComponent implements OnInit {
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
  constructor(public dialogRef: MatDialogRef<CargaComprobantePagoComponent>,private pagosService:PagosService,private alertasService:AlertasService,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
      console.log("INFORMACION DEL PAGO",data)
      this.dataAux=data
    this.detalleInversion = this.data.dataInversion.detalleInversion.data
    this.detalleInversion.id=this.data.dataInversion.detalleInversion.id
      this.detallePago=this.data.pago
        this.detalleUsuario=this.data.dataInversion.usuario
      this.crearCarga()
        console.log("inversion",this.detalleInversion)
        console.log("pago",this.detallePago)
        console.log("usuario",this.detalleUsuario)


        if(this.detallePago.comprobante!=undefined &&this.detallePago.comprobante!=''){
          this.archivo=this.detallePago.comprobante
          this.archivoCargado=true
          this.descripcion=this.detallePago.descripcion
        }

        if(this.data.editar){

        }else{

        }

  }

  ngOnInit() {
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  };
  crearCarga() {
    this.uploader = new FileUploader({
      url: "",
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item: any) => {
        return new Promise((resolve, reject) => {

          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe(res => this.response = res);

  }
  
  cargarDocumentos() {
    let fileCount: number = this.uploader.queue.length;
    if (fileCount > 0) {
      this.uploader.queue.forEach((val: any, i: any, array: any) => {
        let fileReader = new FileReader();
        fileReader.onloadend = (e) => {
          let imageData = fileReader.result;
          let rawData = imageData
          this.archivo=rawData
        }
        fileReader.readAsDataURL(val._file);
      });
    }
  }
  eliminar(i: any) {
    this.documentos.splice(i, 1)
    this.archivoCargado = false
    this.uploader.queue = []
    this.archivo=undefined
    this.dataAux.editar=false
    console.log(this.documentos, this.archivoCargado, this.uploader)
  }
  file(event: any, inputFile: any) {
    console.log(event)
    event = event["0"]
    let formato = false
    let duplicidad = false
    this.archivoCargado = true
    if (event.type != "image/jpeg" && event.type != "image/png") {
      this.uploader.queue[0].remove()
      this.uploader.clearQueue()
      inputFile.value = ""
      this.alertasService.error("Solo se admiten imagenes")
      formato = true
      this.archivoCargado = false

      return
    }else{
      this.cargarDocumentos()
    }
  }

  fileDrop(event: any) {
    console.log(event)

    event = event["0"]
    let formato = false
    let duplicidad = false
    this.archivoCargado = true

    if (event.type != "image/jpeg" && event.type != "image/png") {
      this.uploader.queue[0].remove()
      this.uploader.clearQueue()
      formato = true
      this.alertasService.error("Solo se admiten imagenes")
      this.archivoCargado = false

      return
    }else{
      this.cargarDocumentos()
    }


  }
  cancelar(val) {
    this.dialogRef.close(val);
  }

  enviarComprobante(){
    console.log(this.detallePago)
    let id_pago=this.detallePago.id.split("/Pagos/")[1]
    this.pagosService.enviarComprobante(id_pago,this.archivo,this.detallePago.id,this.descripcion).subscribe((resp:any)=>{
      if(resp.success){
        this.alertasService.exitoso(resp.message)
        this.cancelar(true)
      }else{
        this.alertasService.error(resp.message)
      }
    })
  }
}
