import { Component } from '@angular/core'
import { Route, Router } from '@angular/router'

@Component({
  selector: 'app-inicio-component',
  templateUrl: './inicio.component.html'
})

export class InicioComponent {
  constructor(private router: Router) { }

  public TiendaMultiservicio = "Tienda Multiservicio Julian";

  public Navegar() {
    this.router.navigate(['/login']);
  }
}
