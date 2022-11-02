import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AlertasService } from '../services/alertas/alertas.service';
import { LoaderService } from '../services/loader/loader.service';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.css']
})
export class SimuladorComponent implements OnInit {
  formulario: FormGroup
  valor
  pagos = []
  val
  @ViewChild('invoice') invoiceElement!: ElementRef;
  exportando=false
  constructor(private toastr: AlertasService,private router:Router, public loaderService: LoaderService,private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.crearFormulario()
  }

  ngOnInit() {
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      tipo: ['', Validators.required],
      valor: [1000000, Validators.required],
      estado: ['pendiente'],
      comprobante: [''],
      porcentaje: [''],
      fecha: [moment(new Date()).format("YYYY-MM-DD")]
    })
    this.valor = 5000000
  }
  validarTipo() {
    console.log(this.formulario.controls.tipo.value)
    if (this.formulario.controls.tipo.value === 'A Riesgo') {
      this.formulario = this.fb.group({
        tipo: [this.formulario.value.tipo, Validators.required],
        valor: [this.formulario.value.valor, Validators.required],
        estado: [this.formulario.value.estado],
        comprobante: [this.formulario.value.comprobante],
        porcentaje: [this.formulario.value.porcentaje, Validators.required],
        fecha: [moment(new Date()).format("YYYY-MM-DD")]
      })
      console.log(this.formulario.value, this.formulario)
    } else {
      this.formulario = this.fb.group({
        tipo: [this.formulario.value.tipo, Validators.required],
        valor: [this.formulario.value.valor, Validators.required],
        estado: [this.formulario.value.estado],
        comprobante: [this.formulario.value.comprobante],
        porcentaje: [this.formulario.value.porcentaje],
        fecha: [moment(new Date()).format("YYYY-MM-DD")]
      })
    }
  }

  generarSimulacion() {
    this.usuarioService.obtenerSimulacionPagos(this.formulario.value).subscribe(resp => {
      if (resp.success) {
        this.verResumen()
        let val: any = {}
        this.pagos = resp.data
        console.log(resp)
        this.toastr.exitoso(resp.message)
      } else {
        this.toastr.error(resp.message)

      }
    })
  }

  verResumen(){

    this.val = {}
    this.val.usuario = {}
    this.val.pagos = this.pagos
    this.val.usuario.simulacion = false
    this.val.detalleInversion=this.formulario.value
    console.log(this.val)
  }

  public exportar(): void {
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
        PDF.save('REPORTE DE INVERSIÓN.pdf');
      });
      this.exportando = false
      this.loaderService.cerrar()
    }, 1000)

    // 

  }

}
