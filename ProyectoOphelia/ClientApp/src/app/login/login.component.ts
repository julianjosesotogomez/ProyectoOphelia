import { Component } from '@angular/core';
import { ClienteServicio } from '../servicios/cliente.servicios';

@Component({
  selector: 'app-Login-component',
  templateUrl: './login.component.html'
})

export class LoginComponent {
  constructor(private servicioLogin:ClienteServicio)
  {
    servicioLogin.ObtenerClientes().subscribe(res => {console.log(res)})
  }
}
