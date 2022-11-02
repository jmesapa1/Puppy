import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Properties } from './../../Properties';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {

  }
  public crearUsuario(data): Observable<any> {
    return this.http.post(Properties.url + "/usuarios", data);
  }
  public editarUsuario(data): Observable<any> {
    return this.http.put(Properties.url + "/usuarios", data);
  }


  public obtenerUsuario(): Observable<any> {
    return this.http.get(Properties.url + "/usuarios");
  }


  crearInversion(data):Observable<any>{
    return this.http.post(Properties.url + "/inversion", data)
  }
  editarInversion(data):Observable<any>{
    return this.http.put(Properties.url + "/inversion", data)
  }
  obtenerPagos(data):Observable<any>{
    let val={
      id_inversion:data
    }
    return this.http.post(Properties.url + "/pagos", val)
  }

  obtenerSimulacionPagos(data):Observable<any>{
    
    return this.http.post(Properties.url + "/pagos/simulacion", data)
  }
}
