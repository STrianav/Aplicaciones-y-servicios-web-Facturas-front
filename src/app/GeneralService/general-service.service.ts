import { inject, Injectable } from '@angular/core';
import { AlertasService } from '../alertas/alert/alertas.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {
  private alertService = inject(AlertasService);

  constructor() { }

  clearLocalStorage() {
    localStorage.removeItem('correo');
    localStorage.removeItem('esCliente');
    localStorage.removeItem('esProveedor');
    localStorage.removeItem('token');
  }

  async showAlert(mensaje: string, alertType: 'success' | 'error' | 'info', cerrarAuto: boolean, time: number): Promise<boolean> {
    const result = await this.alertService.showAlert(mensaje, alertType, cerrarAuto, time);
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Los meses en JS empiezan desde 0
    const day = date.getDate();

    return `${year}-${month}-${day}`;
  };
}
