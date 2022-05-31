import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment.prod';
import { AuthApi } from '../modelos/authapi';
import { Cliente } from '../modelos/cliente';
import { UsuarioApi } from '../modelos/usuarioapi';
import { ClienteServicio } from '../servicios/cliente.servicios';
import { UsuarioApiServicios } from '../servicios/usuarioapi.servicios';

@Component({
  selector: 'app-Login-component',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit{
  usuarioApi: AuthApi;
  loginForm: FormGroup;
  enviado = false;
  token: string;

  constructor(private servicioLogin: UsuarioApiServicios, private formBuilder: FormBuilder)
  {
    this.usuarioApi =
    {
      email: environment.usuarioApi,
      password: environment.passwordApi
    } 
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
    //API
    this.servicioLogin.loginApi(this.usuarioApi).subscribe(res => {
      if (res.error != null && res.error != '')
        console.log("Error!" + res.error);
      else
        console.log("Correcto!")
      this.token = (res.objetoGenerico as UsuarioApi).token;
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  public Login() {
    this.enviado = true;
    if (this.loginForm.invalid) {
      console.log("Inalido");
      return;
    }
    //Token para las cabeceras
    let cliente: Cliente =
    {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    };
  }
}
