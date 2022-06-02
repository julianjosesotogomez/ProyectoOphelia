import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Resultado } from '../modelos/resultado';
import { Cliente } from '../modelos/cliente';
import { map } from 'rxjs/operators'

@Injectable
  ({
    providedIn: 'root'
  })
export class ClienteServicio {
  url: string = "https://localhost:44459/api/clientes/";

  private emailLoginSubject: BehaviorSubject<Cliente>

  public get usuarioLogin(): Cliente {
    return this.emailLoginSubject.value;
  }

  constructor(private peticion: HttpClient)
  {
    this.emailLoginSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('emailLogin' || '{}')));
  }

  ObtenerClientes(): Observable<Resultado>
  {
    return this.peticion.get<Resultado>(this.url);
  }

  InsertarCliente(cliente: Cliente): Observable<Resultado>
  {
    return this.peticion.post<Resultado>(this.url, cliente);
  }

  ModificarCliente(cliente: Cliente): Observable<Resultado> {
    return this.peticion.put<Resultado>(this.url, cliente);
  }

  EliminarCliente(email: Cliente): Observable<Resultado> {
    return this.peticion.delete<Resultado>(this.url + email);
  }

  loginCliente(cliente: Cliente, token: string): Observable<Resultado> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.peticion.post<Resultado>(this.url + "login", cliente, { headers: reqHeader }).pipe(
      map(res => {
        if (res.error == null || res.error == '') {
          const cliente: Cliente = (res.objetoGenerico as Cliente);
          localStorage.setItem('emailLogin', JSON.stringify(cliente));
          this.emailLoginSubject.next(cliente);
        }
        return res;
      })
    );   
  }
}

