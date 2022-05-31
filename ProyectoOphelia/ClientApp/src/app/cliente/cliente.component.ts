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
  eliminarForm!: FormGroup;
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
    this.eliminarForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
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
        console.log("Error!"+res.error);
      else
        console.log("Correcto!")
    });

  }

  public Modificar() {
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

   
    this.servicioCliente.ModificarCliente(cliente).subscribe(res => {
      if (res.error != null && res.error != '')
        console.log("Error!" + res.error);

      else
        console.log("Correcto!")
    });
  }
  public Eliminar() {
    this.enviado = true;
    if (this.eliminarForm.invalid) {
      console.log("Inalido");
      return;
    }
    console.log("Valido")
    this.servicioCliente.EliminarCliente(this.registroForm.controls['email'].value).subscribe(res => {
      if (res.error != null && res.error != '')
        console.log("Error!" + res.error);
      else
        console.log("Correcto!")
    });
  }
}
