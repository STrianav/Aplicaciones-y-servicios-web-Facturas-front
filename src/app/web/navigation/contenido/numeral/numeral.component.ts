import { Component } from '@angular/core';
import { ModuloGeneralModule } from '../../../../shared/modulo-general.module';
import { ApiService } from '../../../../Api/api.service';
import { FormularioService } from '../../Formulario/formulario.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-numeral',
  imports: [ModuloGeneralModule],
  templateUrl: './numeral.component.html',
  styleUrl: './numeral.component.css'
})
export class NumeralComponent {
  data: any;
  Tabla: string = 'numeral';

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
          { name: 'descripcion', label: 'Descripción', type: 'text', value: '', validators: ['required'] },
          { name: 'fkidliteral', label: 'Literal', type: 'text', fk: true, value: '', strTable: "literal", validators: ['required'] }
        ]
      };
    } else if (tipo === 'U') {
      formSchema = {
        fields: [
          { name: 'descripcion', label: 'Descripción', type: 'text', value: row.descripcion, validators: ['required'] },
          { name: 'fkidliteral', label: 'Literal', type: 'text', fk: true, value: row.fkidliteral, strTable: "literal", validators: ['required'] }
        ]
      };
    } else if (tipo === 'D') {
      formSchema = {
        fields: [
          { name: 'descripcion', label: 'Descripción', type: 'text', value: row.descripcion, disabled: true },
          { name: 'fkidliteral', label: 'Artículo', type: 'text', fk: true, value: row.fkidliteral, strTable: "literal", disabled: true }
        ]
      };
    }

    const modalRef = this.modal.openDynamicModal(formSchema, tipo, this.Tabla);

    modalRef.result
      .then(() => this.TraerTabla())
      .catch(error => console.error('Error en el modal:', error));
  }
}
