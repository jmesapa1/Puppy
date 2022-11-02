import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VerComprobantePagoComponent } from '../components/ver-comprobante-pago/ver-comprobante-pago.component';
import { PagosComponent } from '../pagos/pagos.component';
import { AlertasService } from '../services/alertas/alertas.service';
import { AuthService } from '../services/auth/auth.service';
import { BuscadorService } from '../services/buscador/buscador.service';
import { LoaderService } from '../services/loader/loader.service';
import { UsuarioService } from '../services/usuario/usuario.service';
@Component({
  selector: 'app-buscador-cliente',
  templateUrl: './buscador-cliente.component.html',
  styleUrls: ['./buscador-cliente.component.css']
})
export class BuscadorClienteComponent implements OnInit {
  form: FormGroup
  existeCatcha = false
  otpEnviado = true
  pagos = []
  inicioSesion = false
  infoUsuario
  arrayInversiones = []
  displayedColumns: string[] = ['No', 'fecha','porcentaje', 'valor', 'pagado','comprobante'];
  displayedColumns2: string[] = ['No', 'fecha', 'porcentaje','valor', 'pagado'];

  constructor(private fb: FormBuilder, private router: Router, public dialog: MatDialog, private alertasService: AlertasService, private loaderService: LoaderService, public authService: AuthService, private buscadorService: BuscadorService
  ) {
    if (localStorage.getItem("InicioSesionPuppy") != undefined && localStorage.getItem("InicioSesionPuppy") != null) {
      this.inicioSesion = true
      this.form = this.fb.group({
        celular: [localStorage.getItem("celularPuppy"), [Validators.required]],
      })
      this.obtenerPagos()
    }

  }

  ngOnInit() {
    if (localStorage.getItem("InicioSesionPuppy") != undefined && localStorage.getItem("InicioSesionPuppy") != null) {
      this.form = this.fb.group({
        celular: [localStorage.getItem("celularPuppy"), [Validators.required]],
      })
    } else {
      this.form = this.fb.group({
        celular: ['', [Validators.required]],
      })
    }

  }
  ngOnDestroy() {
  }

  validando() {
    if (document.getElementById("recaptcha-container") != null) {
      return true
    } else {
      return false
    }
  }
  Cancelar() {
    if (document.getElementById("recaptcha-container") != null) {
      document.getElementById("recaptcha-container").remove();
    }
  }
  AuthLoginCell() {
    let me = this
    me.buscadorService.usuarioExiste(me.form.controls.celular.value).subscribe(resp => {
      if (resp.success) {
        if (resp.data.length != 0) {
          if (document.getElementById("recaptcha-container") != null) {
            document.getElementById("recaptcha-container").remove();

          }
          this.authService.SignInCelular("+57" + this.form.controls.celular.value).then(function (confirmationResult) {
            var verificationCode = window.prompt('Please enter the verification ' +
              'code that was sent to your mobile device.');
            return confirmationResult.confirm(verificationCode).then(x => {
              me.inicioSesion = true
              localStorage.setItem("InicioSesionPuppy", "true")
              localStorage.setItem("celularPuppy", me.form.controls.celular.value)
              me.obtenerPagos()
            }).catch(error => {
              me.inicioSesion = false

              localStorage.removeItem("InicioSesionPuppy")
              localStorage.removeItem("celularPuppy")

              me.alertasService.error("Se genero un error")
              if (document.getElementById("recaptcha-container") != null) {
                document.getElementById("recaptcha-container").remove();

              }
            })
          }).catch(function (error) {
            me.alertasService.error("El codigo de verificación es incorrecto")      // ...
            if (document.getElementById("recaptcha-container") != null) {
              document.getElementById("recaptcha-container").remove();
            }
          });
        } else {
          me.alertasService.error("El usuario no existe")      // ...
          if (document.getElementById("recaptcha-container") != null) {
            document.getElementById("recaptcha-container").remove();
          }

        }
      } else {
        me.alertasService.error("No se puede validar tu número de celular")      // ...

      }
    })


  }

  obtenerPagos() {
    this.buscadorService.obtenerPagos(this.form.controls.celular.value).subscribe(resp => {
      if (resp.success) {
        this.alertasService.exitoso(resp.message)
        this.pagos = resp.data
        this.infoUsuario = resp.data[0].inversionista
        this.pagos.sort(compare)
        this.filtrarPorInversiones()
        console.log(this.pagos)
      } else {
        this.alertasService.error(resp.message)
      }
    })

  }

  usuarioExiste() {


  }

  filtrarPorInversiones() {
    this.arrayInversiones = []

    this.pagos.forEach(pago => {
      let index = this.arrayInversiones.findIndex(x => x.inversion.id === pago.data.id_inversion)

      if (index != -1) {

        let array = this.arrayInversiones[index].pagos
        array.push(pago.data)
        this.arrayInversiones[index].pagos = array
      } else {
        console.log(pago)
        pago.inversion.id = pago.data.id_inversion
        this.arrayInversiones.push({ inversion: pago.inversion, pagos: [pago.data], abierto: false })
      }
    })
    console.log(this.arrayInversiones)
  }
  obtenerIdInversionista(val) {
    return val.split("/Inversiones/")[1]
  }

  verComprobante(pago) {
    const dialogRef = this.dialog.open(VerComprobantePagoComponent, {
      width: '500px',
      data: { pago },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerPagos()
      }
    });
  }


}
function compare(a: any, b: any) {
  if (a.data.fecha < b.data.fecha) {
    return -1;
  }
  if (a.data.fecha > b.data.fecha) {
    return 1;
  }
  return 0;
}