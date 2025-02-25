import { inject, Injectable } from '@angular/core';
import { NgbModal  } from '@ng-bootstrap/ng-bootstrap';
import { AlertasComponent } from '../alertas.component';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {
  modalService = inject(NgbModal );

  constructor() { }

  showAlert(
    message: string, 
    alertType: 'success' | 'error' | 'info' = 'success', 
    dismissible: boolean = true, 
    duration?: number
  ): Promise<boolean> {
    const modalRef = this.modalService.open(AlertasComponent, {
      backdrop: 'static', 
      keyboard: false,
      centered: true
    });
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.alertType = alertType;
    modalRef.componentInstance.dismissible = dismissible;

    if (duration) {
      setTimeout(() => modalRef.close(), duration);
    }

    return modalRef.result; // Devuelve `true` o `false` dependiendo de la acción del usuario
  }
}
