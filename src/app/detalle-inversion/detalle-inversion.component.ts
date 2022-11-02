import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlertasService } from '../services/alertas/alertas.service';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Location } from '@angular/common';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { FileUploader } from 'ng2-file-upload';
import { Alert } from 'bootstrap';
import moment from 'moment';
import { LoaderService } from '../services/loader/loader.service';

@Component({
  selector: 'app-detalle-inversion',
  templateUrl: './detalle-inversion.component.html',
  styleUrls: ['./detalle-inversion.component.css'],
})
export class DetalleInversionComponent implements OnInit {
  data
  opcion
  nombre = ""
  identificacion = ""
  formulario: FormGroup
  valor = 1000000
  descripcion
  options: Options = {
    floor: 1000000,
    ceil: 200000000,
    step: 1000000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Valor:</b> $' + value.toLocaleString('en-US');
        case LabelType.High:
          return '<b>Valor maxímo:</b> $' + value.toLocaleString('en-US');
        default:
          return '$' + value.toLocaleString('en-US');
      }
    }
  };
  uploader: any;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response
  archivoCargado = false
  documentos = []
  constructor(private router: Router,private loaderService:LoaderService ,private alertasService: AlertasService, private _location: Location, private fb: FormBuilder, private toastr: AlertasService, private usuarioService: UsuarioService) {
    this.data = this.router.getCurrentNavigation().extras.state
    console.log(this.data)
    try {
      this.nombre = this.data.nombre
      this.identificacion = this.data.identificacion
      if (this.data.opcion === 'crear') {
        this.crearFormulario()
      } else {
        this.crearFormularioConData()

      }
      this.crearCarga()
    } catch (e) {
      console.log(e)
      this._location.back()
      this.router.navigateByUrl("/usuarios")
    }

  }

  ngOnInit() {
  }

  enviarMensaje() {
    window.open("https://web.whatsapp.com/send?phone=" + this.data.whatsapp, "_blank")
  }
  crearFormulario() {
    this.formulario = this.fb.group({
      identificacion: [this.data.identificacion, Validators.required],
      tipo: ['', Validators.required],
      valor: [1000000, Validators.required],
      estado: ['pendiente'],
      descripcion:[''],
      comprobante: [''],
      porcentaje: [''],
      fecha: [new Date()]
    })
    this.valor = 5000000
    console.log(this.formulario.value)
  }
  crearFormularioConData() {
    let dataDate = this.data.inversion.data.fecha.split("-")

    this.formulario = this.fb.group({
      identificacion: [this.data.identificacion, Validators.required],
      tipo: [this.data.inversion.data.tipo, Validators.required],
      valor: [this.data.inversion.data.valor, Validators.required],
      estado: [this.data.inversion.data.estado],
      porcentaje: [this.data.inversion.data.porcentaje],
      descripcion:[this.data.inversion.data.descripcion],
      comprobante: [this.data.inversion.data.comprobante, Validators.required],
      fecha: [new Date(dataDate[0], dataDate[1]-1, dataDate[2])]

    })
    this.valor = this.data.inversion.data.valor
    console.log(this.data.inversion.data.estado)
    if (this.data.inversion.data.estado === 'activo') {

      this.archivoCargado = true
      this.formulario.controls.tipo.disable()
      this.formulario.controls.valor.disable()
    }
  }

  crearInversion() {
    if (this.formulario.controls.comprobante.value === '') {
      this.formulario.controls.estado.setValue("pendiente")
    } else {
      this.formulario.controls.estado.setValue("activo")

    }
    this.formulario.value.descripcion=this.descripcion
    console.log(this.formulario.value)

    this.formulario.value.fecha=moment(this.formulario.value.fecha).format("YYYY-MM-DD")
    console.log(this.formulario)

    this.usuarioService.crearInversion(this.formulario.value).subscribe(resp => {
      if (resp.success) {
        this.toastr.exitoso(resp.message)
          this.router.navigateByUrl("/usuarios")
      } else {
        this.toastr.error(resp.message)
      }
    })
  }

  editarUsuario() {
    let data = this.formulario.value
    data.id = this.data.inversion.id
    data.tipo=this.formulario.controls.tipo.value
    data.valor=this.formulario.controls.valor.value
    data.descripcion=this.descripcion
    this.formulario.value.fecha=moment(this.formulario.value.fecha).format("YYYY-MM-DD")

    this.usuarioService.editarInversion(data).subscribe(resp => {
      if (resp.success) {
        this.toastr.exitoso(resp.message)
        this.loaderService.presentLoading()
        setTimeout(x=>{
          this.loaderService.cerrar()

          this.router.navigateByUrl("/usuarios")

        },4000)
      } else {
        this.toastr.error(resp.message)
      }
    })
  }

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
          console.log(val)

          let imageData = fileReader.result;
          let rawData = imageData
          this.formulario.controls.comprobante.setValue(rawData)
          this.formulario.controls.estado.setValue("activo")

        }
        fileReader.readAsDataURL(val._file);
      });
    }
  }
  eliminar(i: any) {
    this.documentos.splice(i, 1)
    this.archivoCargado = false
    this.uploader.queue = []
    this.formulario.controls.comprobante.setValue('')
    console.log(this.documentos, this.archivoCargado, this.uploader)
  }
  onFileChanged(event) {
    console.log(event);
  }
  file(event: any, inputFile: any) {
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
    } else {
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
    } else {
      this.cargarDocumentos()
    }
  }

  validarTipo() {
    console.log(this.formulario.value)
    if (this.formulario.controls.tipo.value === 'A Riesgo') {
      this.formulario = this.fb.group({
        identificacion: [this.data.identificacion, Validators.required],
        tipo: [this.formulario.value.tipo, Validators.required],
        valor: [this.formulario.value.valor, Validators.required],
        estado: [this.formulario.value.estado],
        comprobante: [this.formulario.value.comprobante],
        porcentaje: [this.formulario.value.porcentaje, Validators.required],
        fecha: [this.formulario.value.fecha]
      })
      console.log(this.formulario.value, this.formulario)
    } else {
      this.formulario = this.fb.group({
        identificacion: [this.data.identificacion, Validators.required],
        tipo: [this.formulario.value.tipo, Validators.required],
        valor: [this.formulario.value.valor, Validators.required],
        estado: [this.formulario.value.estado],
        comprobante: [this.formulario.value.comprobante],
        porcentaje: [this.formulario.value.porcentaje],
        fecha: [this.formulario.value.fecha]
      })
    }
  }
}
