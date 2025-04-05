import { Injectable } from '@angular/core';
import { FormulariodinamicoComponent } from './formulariodinamico/formulariodinamico.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormField } from '../../../models/FormularioModal';



@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  constructor(private modalService: NgbModal) { }

  openDynamicModal(formSchema: any, CRUUD: 'C' | 'U' | 'D', Tabla: string): NgbModalRef {
    const modalRef = this.modalService.open(FormulariodinamicoComponent, {
      size: 'xl',
      backdrop: 'static'
    });
    // Pasa el JSON al componente modal
    modalRef.componentInstance.formSchema = formSchema;
    modalRef.componentInstance.crudd = CRUUD;
    modalRef.componentInstance.Tabla = Tabla;
    return modalRef;
  }

}
