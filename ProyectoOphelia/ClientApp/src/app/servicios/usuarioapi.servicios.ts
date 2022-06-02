import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthApi } from '../modelos/authapi';
import { Resultado } from '../modelos/resultado';
import { map } from 'rxjs/operators';
import { UsuarioApi } from '../modelos/usuarioapi';

@Injectable
  ({
    providedIn: 'root'
  })

export class UsuarioApiServicios {
  url: string = "https://localhost:44459/api/usuariosapi/";

  private tokenApiSubject: BehaviorSubject<string>

  public get tokenApi(): string {
    return this.tokenApiSubject.value;
  }

  constructor(private peticion: HttpClient) {
    this.tokenApiSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('token') || '{}'));
  }

  loginApi(autenticacion: AuthApi): Observable<Resultado>
  {
    //Me permite guardar el token en memoria LOCAL STORAGE
    return this.peticion.post<Resultado>(this.url, autenticacion).pipe( 
      map(res => {
        if (res.error == null || res.error == '') {
          const token: string = (res.objetoGenerico as UsuarioApi).token;
          localStorage.setItem('token', JSON.stringify(token));
          this.tokenApiSubject.next(token);
        }
        return res;
      })
    );
  }
}
