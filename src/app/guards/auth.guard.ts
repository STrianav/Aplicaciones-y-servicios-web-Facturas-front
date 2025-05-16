import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../Api/api.service';
import { GeneralServiceService } from '../GeneralService';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private api: ApiService, private router: Router, private general: GeneralServiceService) { }

  async canActivate(): Promise<boolean> {
    const token = sessionStorage.getItem('token');

    if (!token) {
      this.general.showAlert("Tu sesión ha caducado. Vuelve a iniciar sesión.", "info", true, 3000).then(() => {
        this.router.navigate(['/login']);
      });
      return false;
    }

    try {
      const response = await firstValueFrom(this.api.validarToken());

      if (response?.mensaje === 'Token válido') {
        return true;
      }

      this.general.showAlert("Tu sesión ha caducado. Vuelve a iniciar sesión.", "info", true, 3000).then(() => {
        this.router.navigate(['/login']);
      });
      return false;

    } catch (error) {
      console.error('Error validando el token:', error);
      this.general.showAlert("Tu sesión ha caducado. Vuelve a iniciar sesión.", "info", true, 3000).then(() => {
        this.router.navigate(['/login']);
      });
      return false;
    }
  }
}
