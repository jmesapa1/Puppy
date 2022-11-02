import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import firebase from "firebase/compat/app";
import { AlertasService } from '../alertas/alertas.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  existeCatcha = false
  constructor(public afAuth: AngularFireAuth, private storage: AngularFireStorage, private router: Router, private alertasService: AlertasService, public ngZone: NgZone) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/usuarios');
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        this.alertasService.error("Correo o clave incorrectos");
      });
  }

 

  SignInCelular(celular: string) {
    let me = this
    if (this.existeCatcha) {
      if (document.getElementById("recaptcha-container") != null) {
        document.getElementById("recaptcha-container").remove();

      } let div = document.createElement('div');
      div.className = "row"
      div.innerHTML = "<div id='recaptcha-container' style='margin:auto'></div>";
      document.getElementById("principal").appendChild(div);
    } else {
      let div = document.createElement('div');
      div.className = "row"
      div.innerHTML = "<div id='recaptcha-container' style='margin:auto'></div>";
      document.getElementById("principal").appendChild(div);
    }
    var applicationVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container');
    this.existeCatcha = true
    return this.afAuth.signInWithPhoneNumber(celular, applicationVerifier)
  }

  SetUserData(user: any) {
    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userData
  }



}
