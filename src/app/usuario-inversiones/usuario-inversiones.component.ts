import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlertasService } from '../services/alertas/alertas.service';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'usuario-inversiones',
  templateUrl: './usuario-inversiones.component.html',
  styleUrls: ['./usuario-inversiones.component.css']
})
export class UsuarioInversionesComponent implements OnInit {
  data
  public lineChartLabels: Array<any>;
  public lineChartData: Array<any>;
  public lineChartColors: Array<any>
  public lineChartOptions: any;
  public lineChartType;
  public gradientFill;
  public ctx;
  public canvas: any;
  public gradientChartOptionsConfiguration: any;

  opcion
  nombre = ""
  identificacion = ""
  formulario: FormGroup
  constructor(private router: Router, private fb: FormBuilder, private toastr: AlertasService, private usuarioService: UsuarioService) {
    try {
      this.data = this.router.getCurrentNavigation().extras.state
      console.log(this.data)
      this.nombre = this.data.nombre
      this.identificacion = this.data.identificacion
    } catch (e) {
      this.router.navigateByUrl("/usuarios")
    }


  }

  ngOnInit() {

  }

  enviarMensaje() {
    window.open("https://web.whatsapp.com/send?phone=" + this.data.whatsapp, "_blank")
  }
  verResumen(inversion){
    this.usuarioService.obtenerPagos(inversion.id).subscribe(resp => {
      if (resp.success) {

        let val: any = {}
        val.usuario = this.data
        val.pagos = resp.data
        val.usuario.simulacion = false
        val.detalleInversion=inversion
        
        this.router.navigateByUrl("/resumen-inversion", { state: val })
        this.toastr.exitoso(resp.message)
      } else {
        this.toastr.error(resp.message)

      }
    })  
  }

  crearUsuario() {
    this.usuarioService.crearUsuario(this.formulario.value).subscribe(resp => {
      if (resp.success) {
        this.toastr.exitoso(resp.message)
        this.formulario.reset()
      } else {
        this.toastr.error(resp.message)
      }
    })
  }

  editarUsuario() {
    this.usuarioService.editarUsuario(this.formulario.value).subscribe(resp => {
      if (resp.success) {
        this.toastr.exitoso(resp.message)
        this.formulario.reset()
      } else {
        this.toastr.error(resp.message)
      }
    })
  }

  crearInversion() {
    let data = this.data
    data.opcion = "crear"
    this.router.navigateByUrl("/detalle-inversion", { state: data })
  }
  editarInversion(inversion) {
    let data = this.data
    data.opcion = "editar"
    data.inversion = inversion
    this.router.navigateByUrl("/detalle-inversion", { state: data })
  }
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }

  verPagos(inversion) {
    this.usuarioService.obtenerPagos(inversion.id).subscribe(resp => {
      if (resp.success) {

        let val: any = {}
        val.usuario = this.data
        val.pagos = resp.data
        val.usuario.simulacion = false
        val.detalleInversion=inversion
        
        this.router.navigateByUrl("/detalle-pago", { state: val })
        this.toastr.exitoso(resp.message)
      } else {
        this.toastr.error(resp.message)

      }
    })
  }
  verSimulacion(inversion) {
    console.log(inversion)
    this.usuarioService.obtenerSimulacionPagos(inversion.data).subscribe(resp => {
      if (resp.success) {
        let val: any = {}
        val.usuario = this.data
        val.pagos = resp.data
        val.usuario.simulacion = true
        val.detalleInversion=inversion
        this.router.navigateByUrl("/detalle-pago", { state: val })
        this.toastr.exitoso(resp.message)
      } else {
        this.toastr.error(resp.message)

      }
    })
  }


  editarEstado(data, estado) {
    console.log(data)
    data.data.estado = estado
    data.data.comprobante = ""
    data.data.id = data.id
    this.usuarioService.editarInversion(data.data).subscribe(resp => {
      if (resp.success) {
        this.toastr.exitoso(resp.message)
        this.router.navigateByUrl("/usuarios")
      } else {
        this.toastr.error(resp.message)
      }
    })
  }

  obtenerValorGeneral(){
   let valor=0
    this.data.inversiones.forEach(inversion=>{
      console.log(inversion)
      if(inversion.data.estado!='cancelado' || inversion.data.estado!='pendiente'){
        valor=Number(inversion.data.valor)+valor
      }  
    })
    return valor
  }
}
