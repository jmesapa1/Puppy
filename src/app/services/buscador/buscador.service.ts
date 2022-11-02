import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Properties } from '../../Properties';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {


  constructor(private http: HttpClient) {

  }
  public obtenerPagos(celular): Observable<any> {
    let raw={celular}
    return this.http.post(Properties.url + "/pagosusuario",raw);
  }
  public usuarioExiste(celular): Observable<any> {
    let raw={celular}
    return this.http.post(Properties.url + "/validar-usuario",raw);
  }

  

}
