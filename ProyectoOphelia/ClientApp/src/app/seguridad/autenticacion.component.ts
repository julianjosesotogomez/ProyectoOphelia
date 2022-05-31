import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, Route } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AutenticacionGuard implements CanActivate {
  constructor(private rutes: Router) {

  }
  canActivate(rutes: ActivatedRouteSnapshot) {
    this.rutes.navigate(['/login']);
    return false
  }
}
