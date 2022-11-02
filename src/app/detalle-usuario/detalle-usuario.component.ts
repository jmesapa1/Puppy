import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlertasService } from '../services/alertas/alertas.service';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent implements OnInit {
  data
  opcion
  nombre=""
  identificacion=""
  formulario:FormGroup
  constructor(private router:Router,private fb: FormBuilder,private toastr: AlertasService,private usuarioService:UsuarioService) {
    this.data=this.router.getCurrentNavigation().extras.state
    if(this.data===undefined){
      this.opcion="crear";
      this.crearFormulario()
    }else{
      this.opcion="editar";
      this.crearFormularioConData()
    }

   }

  ngOnInit() {
  }

  enviarMensaje(){
    window.open("https://web.whatsapp.com/send?phone="+this.formulario.controls.whatsapp.value,"_blank")
  }
  crearFormulario() {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      identificacion: ['', Validators.required],
      banco: ['', Validators.required],
      tipo_cuenta: ['', Validators.required],
      numero_cuenta: ['', Validators.required],
      celular: ['', Validators.required],
      whatsapp: ['', Validators.required],
      correo: ['', [Validators.required,Validators.email]],
      estado: [true, Validators.required],

    })
  }
  crearFormularioConData() {
    this.formulario = this.fb.group({
      nombre: [this.data.nombre, Validators.required],
      identificacion: [this.data.identificacion, Validators.required],
      banco: [this.data.banco, Validators.required],
      tipo_cuenta: [this.data.tipo_cuenta, Validators.required],
      numero_cuenta: [this.data.numero_cuenta, Validators.required],
      celular: [this.data.celular, Validators.required],
      whatsapp: [this.data.whatsapp, Validators.required],
      correo: [this.data.correo, Validators.required],
      estado: [this.data.estado, Validators.required],

    })

    this.nombre=this.data.nombre
    this.identificacion=this.data.identificacion
    
  }

  crearUsuario(){
    this.usuarioService.crearUsuario(this.formulario.value).subscribe(resp=>{
      if(resp.success){
        this.toastr.exitoso(resp.message)
        this.router.navigateByUrl("/usuarios")
      }else{
        this.toastr.error(resp.message)
      }
    })
  }

  editarUsuario(){
    this.usuarioService.editarUsuario(this.formulario.value).subscribe(resp=>{
      if(resp.success){
        this.toastr.exitoso(resp.message)
        this.router.navigateByUrl("/usuarios")
      }else{
        this.toastr.error(resp.message)
      }
    })
  }

 
}
