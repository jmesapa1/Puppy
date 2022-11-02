import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form:FormGroup
  constructor(private fb:FormBuilder,private router:Router,    public authService: AuthService
    ) {}

  ngOnInit() {
   this.form = this.fb.group({
      correo: ['', [Validators.required,Validators.email]],
      clave: ['', Validators.required],
    })
  }
  ngOnDestroy() {
  }

  iniciarSesion(){
    try{
      this.authService.SignIn(this.form.controls.correo.value, this.form.controls.clave.value).then(x=>{
        console.log(x)
      })
    }catch(e){
      console.log(e)
    }
    
  }

  obtenerData(){
   
  }

  cambiarClave(){
    this.router.navigateByUrl("/olvide-clave")
  }
  registrarse(){
    this.router.navigateByUrl("/register")
  }


}
