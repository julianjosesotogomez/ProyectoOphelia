import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resultado } from '../modelos/resultado';

@Injectable
  ({
    providedIn: 'root'
  })

export class ProductoServicio {
  url: string = "https://localhost:44459/api/productos/";
  constructor(private peticion: HttpClient) {

  }
  ObtenerProductos(token: string): Observable<Resultado>
  {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'applicatio/json',
      'Authorization': 'Bearer ' + token
    });

    return this.peticion.get<Resultado>(this.url, { headers: reqHeader });
  }
}
