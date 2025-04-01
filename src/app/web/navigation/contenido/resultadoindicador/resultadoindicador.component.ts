import { Component } from '@angular/core';
import { ModuloGeneralModule } from '../../../../shared/modulo-general.module';
import { ApiService } from '../../../../Api/api.service';
import { FormularioService } from '../../Formulario/formulario.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-resultadoindicador',
  imports: [ModuloGeneralModule],
  templateUrl: './resultadoindicador.component.html',
  styleUrl: './resultadoindicador.component.css'
})
export class ResultadoindicadorComponent {
  data: any;
  Tabla: string = 'resultadoindicador';

  constructor(private api: ApiService, private modal: FormularioService) {}

  ngOnInit(): void {
    this.TraerTabla();
  }

  async TraerTabla() {
    try {
      this.data = await firstValueFrom(this.api.TraerTabla(this.Tabla));
      console.log('Datos cargados:', this.data);
    } catch (error) {
      console.error('Error al obtener la tabla:', error);
    }
  }

  Crudd(tipo: 'C' | 'U' | 'D', row?: any) {
    let formSchema: any;

    if (tipo === 'C') {
      formSchema = {
        fields: [
          { name: 'resultado', label: 'Resultado', type: 'number', value: '', validators: ['required'] },
          { name: 'fechacalculo', label: 'Fecha de Cálculo', type: 'datetime-local', value: '', validators: ['required'] },
          { name: 'fkidindicador', label: 'Indicador', type: 'number', fk: true, value: '', strTable: "indicador", validators: ['required'] }
        ]
      };
    } else if (tipo === 'U') {
      formSchema = {
        fields: [
          { name: 'resultado', label: 'Resultado', type: 'number', value: row.resultado, validators: ['required'] },
          { name: 'fechacalculo', label: 'Fecha de Cálculo', type: 'datetime-local', value: row.fechacalculo, validators: ['required'] },
          { name: 'fkidindicador', label: 'Indicador', type: 'number', fk: true, value: row.fkidindicador, strTable: "indicador", validators: ['required'] }
        ]
      };
    } else if (tipo === 'D') {
      formSchema = {
        fields: [
          { name: 'resultado', label: 'Resultado', type: 'number', value: row.resultado, validators: ['required'] },
          { name: 'fechacalculo', label: 'Fecha de Cálculo', type: 'datetime-local', value: row.fechacalculo, validators: ['required'] },
          { name: 'fkidindicador', label: 'Indicador', type: 'number', fk: true, value: row.fkidindicador, strTable: "indicador", validators: ['required'] }
        ]
      };
    }

    const modalRef = this.modal.openDynamicModal(formSchema, tipo, this.Tabla);

    modalRef.result
      .then(() => this.TraerTabla())
      .catch(error => console.error('Error en el modal:', error));
  }
}
