import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'  // Esto asegura que el guard esté disponible globalmente
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const rutasPermitidas: string[] = JSON.parse(localStorage.getItem('rutas') || '[]');
    const rutaIntentada = state.url.replace(/^\/+/g, '');  // Quita '/' al inicio de la URL

    if (rutasPermitidas.includes(rutaIntentada)) {
      return true;
    }

    // Si la ruta no está permitida, redirige al inicio
    this.router.navigate(['/navegador/inicio']);
    return false;
  }
}
