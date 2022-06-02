import { Component, OnInit } from '@angular/core';
import { ProductoServicio } from '../servicios/producto.servicios';
import { UsuarioApiServicios } from '../servicios/usuarioapi.servicios';

@Component({
  selector: 'app-producto-component',
  templateUrl: './producto.component.html'
})

export class ProductoComponent implements OnInit{

  public ListaProductos!: any[];

  constructor(private servicioProducto: ProductoServicio, private servicioLogin: UsuarioApiServicios) {

  }
  ngOnInit(): void {
    this.ObtenerProductos()
  }
  ObtenerProductos() {
    this.servicioProducto.ObtenerProductos(this.servicioLogin.tokenApi).subscribe(res => {
      this.ListaProductos = res.objetoGenerico;
    });
  }


}
