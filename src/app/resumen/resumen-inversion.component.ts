import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlertasService } from '../services/alertas/alertas.service';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Location } from '@angular/common';
import { CargaComprobantePagoComponent } from '../components/carga-comprobante-pago/carga-comprobante-pago.component';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { LoaderService } from '../services/loader/loader.service';
import { MatTableDataSource } from '@angular/material/table';
import { ResumenComponent } from '../components/resumen/resumen.component';
import { Buffer } from 'buffer';
declare global { interface Window { AdobeDC: any; } }

@Component({
  selector: 'app-resumen-inversion',
  templateUrl: './resumen-inversion.component.html',
  styleUrls: ['./resumen-inversion.component.css']
})
export class ResumenInversionComponent implements OnInit {
  data
  opcion
  nombre = ""
  identificacion = ""
  formulario: FormGroup
  @ViewChild('invoice') invoiceElement!: ElementRef;
  exportando = false
  displayedColumns: string[] = ['position', 'fecha', 'porcentaje', 'valor',];
  pagos
  base64
  pdfUrl
  constructor(private router: Router, public loaderService: LoaderService, public dialog: MatDialog, private location: Location, private fb: FormBuilder, private toastr: AlertasService, private usuarioService: UsuarioService) {
    try {
      this.data = this.router.getCurrentNavigation().extras.state
      console.log("SIMULACION", this.data.usuario.simulacion, this.data)
      this.identificacion = this.data.usuario.identificacion
      this.nombre = this.data.usuario.nombre
      this.pagos = this.data.pagos

      if (this.data.usuario.simulacion) {

      }
    } catch (e) {
      this.location.back()
    }

  }

  ngOnInit() {
  }

  enviarMensaje() {
    window.open("https://web.whatsapp.com/send?phone=" + this.formulario.controls.whatsapp.value, "_blank")
  }



  cargarComprobante(pago, editar) {
    const dialogRef = this.dialog.open(CargaComprobantePagoComponent, {
      width: '500px',
      data: { pago, dataInversion: this.data, editar },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerPagos()
      }
    });
  }


  verResumen() {
    const dialogRef = this.dialog.open(ResumenComponent, {
      width: '1000px',
      data: { dataInversion: this.data },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  obtenerPagos() {
    this.usuarioService.obtenerPagos(this.data.detalleInversion.id).subscribe(resp => {
      if (resp.success) {
        this.toastr.exitoso(resp.message)
        this.data.pagos = resp.data
      } else {
        this.toastr.error(resp.message)

      }
    })
  }


  public exportar(): void {
    var isSafari =
      navigator.vendor &&
      navigator.vendor.indexOf('Apple') > -1 &&
      navigator.userAgent &&
      navigator.userAgent.indexOf('CriOS') == -1 &&
      navigator.userAgent.indexOf('FxiOS') == -1;
    if (isSafari) {
      var newWindow = window.open('', '_blank');
    }
    this.exportando = true
    this.loaderService.presentLoading()
    setTimeout(x => {
      html2canvas(this.invoiceElement.nativeElement, { scale: 3 }).then((canvas) => {
        const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
        const fileWidth = 210;
        const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
        let PDF = new jsPDF('p', 'mm', 'a4',);
        PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
        PDF.html(this.invoiceElement.nativeElement.innerHTML)
        var out = PDF.output("blob");
        var file = out
        this.pdfUrl = (window.URL || window.webkitURL).createObjectURL(file);
        //If browser is Safari, use a Reader to display the PDF in the previously opened window
        if (isSafari) {
          var reader = new FileReader();
          reader.onloadend = function (e) {
            newWindow.location.href = reader.result as string;
          };
          reader.readAsDataURL(file);
          const downloadLink = document.createElement('a');
          downloadLink.href = this.pdfUrl;
          downloadLink.download = "TEST.pdf";
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        } else {
          //PDF.save("ARCHIVO PRUEBA.pdf")
          window.open(this.pdfUrl, '_blank');

        }

      });
      this.exportando = false
      this.loaderService.cerrar()
    }, 1000)

    // 

  }

  onClickDownloadPdf(base64: string, nombre: string) {
    let base64String = base64;
    this.downloadPdf(base64String, nombre);
  }

  downloadPdf(base64String: string, fileName: string) {
    const source = `${base64String}`;
    const link = document.createElement('a');
    link.href = source;
    link.download = `comprobante-de-cuenta-${fileName}.pdf`;
    link.click();
  }

  validarPagoProximo(pago) {

    if (pago != undefined) {
      let array = pago.fecha.split("-")
      let fecha_orginal = new Date(array[0], Number(array[1]) - 1, Number(array[2]))
      let hoy = new Date()
      var Difference_In_Time = fecha_orginal.getTime() - hoy.getTime();
      var Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
      if (Difference_In_Days === 1) {
        return true
      } else {
        return false
      }
    }


  }

  validarPagoVencido(pago) {
    if (pago != undefined && !pago.pagado) {
      let array = pago.fecha.split("-")
      let fecha_orginal = new Date(array[0], Number(array[1]) - 1, array[2])
      let hoy = new Date()
      var Difference_In_Time = fecha_orginal.getTime() - hoy.getTime();
      var Difference_In_Days = Math.ceil((Difference_In_Time / (1000 * 3600 * 24)))
      if (Difference_In_Days < 1) {
        return true
      } else {
        return false
      }
    } else {
      return false

    }



  }

}
