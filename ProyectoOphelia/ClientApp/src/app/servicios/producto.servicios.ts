import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  ObtenerProductos(): Observable<Resultado>
  {
    return this.peticion.get<Resultado>(this.url);
  }
}
