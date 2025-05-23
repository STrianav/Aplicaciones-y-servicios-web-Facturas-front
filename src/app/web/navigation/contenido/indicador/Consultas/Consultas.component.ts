import { Component, inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModuloGeneralModule } from '../../../../../shared/modulo-general.module';

@Component({
  imports: [ModuloGeneralModule],
  selector: 'app-Consultas',
  templateUrl: './Consultas.component.html',
  styleUrls: ['./Consultas.component.css']
})
export class ConsultasComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() Consulta!: string;
  columnas: string[] = [];

  activeModal = inject(NgbActiveModal);

  ngOnInit() {
    if (this.data?.length) {
      this.columnas = Object.keys(this.data[0]);
    } else {
      this.columnas = [];
    }
  }

  cancel() {
    this.activeModal.dismiss(false);
  }
}
