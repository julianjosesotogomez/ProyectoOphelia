import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../modelos/cliente';
import { ClienteServicio } from '../servicios/cliente.servicios';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Template } from '@angular/compiler/src/render3/r3_ast';



@Component({
  selector: 'app-cliente-component',
  templateUrl: './cliente.component.html'
})

export class ClienteComponent {

  registroForm!: FormGroup;
  enviado = false;

  constructor( private servicioCliente: ClienteServicio, private formBuilder: FormBuilder)
  {

  }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      edad:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['',Validators.required]
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registroForm.controls;
  }

  public Registro()
  {
    this.enviado = true;
    if (this.registroForm.invalid) {
      console.log("Inalido");
      return;
    }
    console.log("Valido")
    let cliente: Cliente =
    {
      nombre: this.registroForm.controls['nombre'].value,
      edad: this.registroForm.controls['edad'].value,
      email: this.registroForm.controls['email'].value,
      password: this.registroForm.controls['password'].value,
    };
    this.servicioCliente.InsertarCliente(cliente).subscribe(res =>
    {
      if (res.error != null && res.error != '')
        console.log(res.error);
      else
        console.log("Correcto!")
    });
  }
}
