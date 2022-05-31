import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resultado } from '../modelos/resultado';
import { Cliente } from '../modelos/cliente';

@Injectable
  ({
    providedIn: 'root'
  })
export class ClienteServicio {
  url: string = "https://localhost:44459/api/clientes/";
  constructor(private peticion: HttpClient)
  {

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
}

