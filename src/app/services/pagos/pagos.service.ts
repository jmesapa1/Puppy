import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Properties } from '../../Properties';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  constructor(private http: HttpClient) {

  }
  public obtenerPagos(): Observable<any> {
    return this.http.get(Properties.url + "/pagos");
  }

  enviarComprobante(id,comprobante,id_inversion,descripcion){
    let raw={
      id,comprobante,id_inversion,descripcion
    }
    return this.http.put(Properties.url + "/pagos",raw);

  }

}
