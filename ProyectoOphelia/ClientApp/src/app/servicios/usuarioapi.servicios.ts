import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthApi } from '../modelos/authapi';
import { Resultado } from '../modelos/resultado';

@Injectable
  ({
    providedIn: 'root'
  })

export class UsuarioApiServicios {
  url: string = "https://localhost:44459/api/usuariosapi/";
  constructor(private peticion: HttpClient) {

  }

  loginApi(autenticacion: AuthApi): Observable<Resultado> {
    return this.peticion.post<Resultado>(this.url, autenticacion);
  }
}
