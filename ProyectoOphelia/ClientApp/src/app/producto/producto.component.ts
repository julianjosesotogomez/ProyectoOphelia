import { Component, OnInit } from '@angular/core';
import { ProductoServicio } from '../servicios/producto.servicios';

@Component({
  selector: 'app-producto-component',
  templateUrl: './producto.component.html'
})

export class ProductoComponent implements OnInit{

  public ListaProductos!: any[];

  constructor(private servicioProducto: ProductoServicio) {

  }
  ngOnInit(): void {
    this.ObtenerProductos()
  }
  ObtenerProductos() {
    this.servicioProducto.ObtenerProductos().subscribe(res => {
      this.ListaProductos = res.objetoGenerico;
    });
  }


}
