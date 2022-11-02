import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CargaComprobantePagoComponent } from '../components/carga-comprobante-pago/carga-comprobante-pago.component';
import { DetalleInversionModalComponent } from '../components/detalle-inversion/detalle-inversion.component';
import { DetalleUsuarioModalComponent } from '../components/detalle-usuario-modal/detalle-usuario-modal.component';
import { AlertasService } from '../services/alertas/alertas.service';
import { PagosService } from '../services/pagos/pagos.service';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  displayedColumns: string[] = ['position', 'fecha', 'nombre', 'porcentaje', 'valor', 'estado', 'inversionista', 'opciones'];
  pagos = new MatTableDataSource([]);
  pagosAux = []
  todos = []
  pagados = []
  pendiente = []
  general = []

  @ViewChild(MatSort) sort: MatSort;
  inversionistas = []
  buscadorInversion = ""
  source
  pagadoBool = false
  todoBool = true
  pendienteBool = false
  constructor(public dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer, private pagoService: PagosService, private toastr: AlertasService, private router: Router) {
    this.obtenerPagos()

  }

  ngOnInit() {

  }



  obtenerPagos() {
    this.pagoService.obtenerPagos().subscribe(resp => {
      if (resp.success) {
        this.toastr.exitoso(resp.message)
        let data = resp.data.filter(x =>
          x.data.valor_pago != '0' && x.data.valor_pago != 0
        )

        this.obtenerInversionistas(resp.data)
        data.sort(compare)
        this.pagos = new MatTableDataSource<any>(data);

        this.general = data
        this.pagosAux = this.pagos.data
        this.pagos.sort = this.sort;
        this.todos = data.filter(x =>x.data.valor_pago != 0)
        this.pendiente = data.filter(x => !x.data.pagado && x.data.valor_pago != 0)
        this.pagados = data.filter(x => x.data.pagado && x.data.valor_pago != 0)
        this.filtrarCliente()
      } else {
        this.toastr.error(resp.message)
      }
    })
  }

  applyFilter(event: Event) {


  }

  editarInversionista(registro) {

    this.router.navigateByUrl("/detalle-usuario", { state: registro })
  }

  verInversiones(registro) {
    this.router.navigateByUrl("/usuario-inversiones", { state: registro })
  }

  verInversion(inversion) {
    this.abrirModalDetalleInversion(inversion)
  }

  abrirModalDetalleInversion(inversion) {
    const dialogRef = this.dialog.open(DetalleInversionModalComponent, {
      width: '250px',
      data: inversion,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  abrirModalDetalleUsuario(usuario) {
    const dialogRef = this.dialog.open(DetalleUsuarioModalComponent, {
      width: '500px',
      data: usuario.inversionista,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  abrirModalCargaComprobante(usuario) {
    const dialogRef = this.dialog.open(CargaComprobantePagoComponent, {
      width: '500px',
      data: usuario.inversionista,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obtenerPagos()
    });
  }
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  verDetalle(val) {
    if (val === 'pagados') {
      this.pagadoBool = true
      this.todoBool = false
      this.pendienteBool = false
      this.pagos = new MatTableDataSource<any>(this.pagados);
      this.pagos.sort = this.sort;
      return
    }
    if (val === 'pendientes') {
      console.log("pendiente", this.pendiente)
      this.pagadoBool = false
      this.pendienteBool = true
      this.todoBool = false
      this.pagos = new MatTableDataSource<any>(this.pendiente);
      this.pagos.sort = this.sort;
      return

    }
    if (val === 'todos') { }
    this.todoBool = true
    this.pendienteBool = false
    this.pagadoBool = false
    this.pagos = new MatTableDataSource<any>(this.todos);
    this.pagos.sort = this.sort;
    return

  }

  cantidadProximo() {
    return this.pendiente.filter(x => this.validarPagoProximo(x)).length
  }
  verDetalleProximo() {
    this.pagos = new MatTableDataSource<any>(this.pendiente.filter(x => this.validarPagoProximo(x)));

  }
  cantidadVencido() {
    return this.pendiente.filter(x => this.validarPagoVencido(x)).length
  }
  verDetalleVencido() {
    this.pagos = new MatTableDataSource<any>(this.pendiente.filter(x => this.validarPagoVencido(x)));
  }

  cargarComprobante(pago, editar) {
    console.log(pago)

    let data: any = {
      detalleInversion: {
        data: {},
        id: ''
      },
      pago: {}

    }
    data.detalleInversion.data = pago.inversion
    data.detalleInversion.id = pago.data.id_inversion
    data.pago = pago.data
    data.usuario = pago.inversionista
    console.log("info del pago", data)
    const dialogRef = this.dialog.open(CargaComprobantePagoComponent, {
      width: '500px',
      data: { pago: pago.data, dataInversion: data, editar },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerPagos()
      }
    });
  }

  validarPagoProximo(pago) {
    let array = pago.data.fecha.split("-")
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

  validarPagoVencido(pago) {
    if (!pago.data.pagado) {
      let array = pago.data.fecha.split("-")
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

  obtenerInversionistas(data) {
    let array = []
    data.forEach(element => {

      if (array.find(x => x.id === element.inversionista.id) === undefined) {
        array.push(element.inversionista)
      }
    });
    console.log(array, "ARRAY INVERSIONISTAS")
    this.inversionistas = array
  }

  filtrarCliente() {
    if (this.buscadorInversion != '') {
      console.log(this.pagos.data, this.buscadorInversion)
      this.pagos = new MatTableDataSource<any>(this.general.filter(x => x.inversionista.id === this.buscadorInversion));
      this.pagosAux = this.pagos.data
      this.todos = this.general.filter(x => x.inversionista.id === this.buscadorInversion)
      this.pendiente = this.pagosAux.filter(x => !x.data.pagado && x.data.valor_pago != 0)
      this.pagados = this.pagosAux.filter(x => x.data.pagado && x.data.valor_pago != 0)
      if (this.pendienteBool) {
        this.pagos = new MatTableDataSource<any>(this.pendiente);
      }
      if (this.pagadoBool) {
        this.pagos = new MatTableDataSource<any>(this.pagados);

      }

    } else {
      this.pagos = new MatTableDataSource<any>(this.general);
      this.pendiente = this.general.filter(x => !x.data.pagado)
      this.pagados = this.general.filter(x => x.data.pagado)
    }
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