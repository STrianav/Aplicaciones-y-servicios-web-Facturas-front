import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../../../Api/api.service';
import { FormularioService } from '../../Formulario/formulario.service';
import { ModuloGeneralModule } from '../../../../shared/modulo-general.module';

@Component({
  selector: 'app-variablesporindicador',
  imports: [ModuloGeneralModule],
  templateUrl: './variablesporindicador.component.html',
  styleUrl: './variablesporindicador.component.css'
})
export class VariablesporindicadorComponent {
  data: any;
  Tabla: string = 'variablesporindicador';

  constructor(private api: ApiService,
    private modal: FormularioService) { }

  ngOnInit(): void {
    this.TraerTabla();
  }

  async TraerTabla() {
    try {
      this.data = await firstValueFrom(this.api.TraerTabla(this.Tabla));
    } catch (error) {
      console.error('Error al obtener la tabla:', error);
    }
  }

  Crudd(tipo: 'C' | 'U' | 'D', row?: any) {
    let formSchema: any;
    if (tipo === 'C') {
      formSchema = {
        fields: [
          { name: 'fkidvariable', label: 'Variable', type: 'text', fk: true, value: '', strTable: "variable", validators: ['required'] },
          { name: 'fkidindicador', label: 'Indicador', type: 'text', fk: true, value: '', strTable: "indicador", validators: ['required'] },
          { name: 'dato', label: 'Dato', type: 'text', value: '', validators: ['required'] },
          { name: 'fkemailusuario', label: 'Email Usuario', type: 'text', fk: true, value: '', strTable: "usuario", validators: ['required'] },
          { name: 'fechadato', label: 'Fecha Dato', type: 'datetime-local', value: '', validators: ['required'] },
        ]
      };
    } else if (tipo === 'U' && row) {
      formSchema = {
        fields: [
          { name: 'fkidvariable', label: 'Variable', type: 'text', fk: true, value: row.fkidvariable, strTable: "variable", validators: ['required'] },
          { name: 'fkidindicador', label: 'Indicador', type: 'text', fk: true, value: row.fkidindicador, strTable: "indicador", validators: ['required'] },
          { name: 'dato', label: 'Dato', type: 'text', value: row.dato, validators: ['required'] },
          { name: 'fkemailusuario', label: 'Email Usuario', type: 'text', fk: true, value: row.fkemailusuario, strTable: "usuario", validators: ['required'] },
          { name: 'fechadato', label: 'Fecha Dato', type: 'datetime-local', value: row.fechadato, validators: ['required'] },
        ]
      };
    } else if (tipo === 'D' && row) {

      formSchema = {
        fields: [
          { name: 'fkidvariable', label: 'Variable', type: 'text', fk: true, value: row.fkidvariable, strTable: "variable", validators: [''] },
          { name: 'fkidindicador', label: 'Indicador', type: 'text', fk: true, value: row.fkidindicador, strTable: "indicador", validators: [''] },
          { name: 'dato', label: 'Dato', type: 'text', value: row.dato, validators: [''] },
          { name: 'fkemailusuario', label: 'Email Usuario', type: 'text', fk: true, value: row.fkemailusuario, strTable: "usuario", validators: [''] },
          { name: 'fechadato', label: 'Fecha Dato', type: 'datetime-local', value: row.fechadato, validators: [''] },
        ]
      };
    }

    const modalRef = this.modal.openDynamicModal(formSchema, tipo, this.Tabla);

    modalRef.result.then(() => {
      this.TraerTabla();
    });
  }
}
