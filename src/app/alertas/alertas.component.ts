import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModuloGeneralModule } from '../shared/modulo-general.module';

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [ModuloGeneralModule],
  templateUrl: './alertas.component.html',
  styleUrl: './alertas.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertasComponent {
  @Input() message!: string;            // El mensaje de la alerta
  @Input() alertType: 'success' | 'error' | 'info' = 'success';  // Tipo de alerta (éxito o error)
  @Input() dismissible: boolean = true;  // Si la alerta se puede cerrar automáticamente
  activeModal = inject(NgbActiveModal);

  constructor() {}

  // Método para aceptar
  confirm() {
    this.activeModal.close(true);  // Devuelve true cuando se acepta
  }

  // Método para cancelar
  cancel() {
    this.activeModal.dismiss(false);  // Devuelve false cuando se cancela
  }
}
