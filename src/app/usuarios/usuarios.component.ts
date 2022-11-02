import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlertasService } from '../services/alertas/alertas.service';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: MatTableDataSource<any>;
  displayedColumns: string[] = ['nombre', 'identificacion', 'numero_cuenta', 'banco','celular','whatsapp','estado','inversiones','opciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private usuarioService:UsuarioService,private toastr: AlertasService,private router:Router) { 
    this.obtenerUsuarios()
  }

  ngOnInit() {
  }

  obtenerUsuarios(){
    this.usuarioService.obtenerUsuario().subscribe(resp=>{
      if(resp.success){
        this.toastr.exitoso(resp.message)
        this.usuarios = new MatTableDataSource(resp.data);
        this.usuarios.paginator = this.paginator;
        this.usuarios.sort = this.sort;
      }else{
        this.toastr.error(resp.message)
      }
    })
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.usuarios.filter = filterValue.trim().toLowerCase();

    if (this.usuarios.paginator) {
      this.usuarios.paginator.firstPage();
    }
  }

  editarInversionista(registro){

    this.router.navigateByUrl("/detalle-usuario",{state:registro})
  }

  verInversiones(registro){
    this.router.navigateByUrl("/usuario-inversiones",{state:registro})
  }

  validaInversionista(row){
    if(row.inversiones.find(x=>x.data.tipo==='A Riesgo')!=undefined){
      return true
    }else{
      return  false

    }
  }

}
