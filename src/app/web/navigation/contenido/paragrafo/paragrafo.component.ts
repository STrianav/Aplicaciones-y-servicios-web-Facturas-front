import { Component } from '@angular/core';
import { ModuloGeneralModule } from '../../../../shared/modulo-general.module';
import { ApiService } from '../../../../Api/api.service';
import { FormularioService } from '../../Formulario/formulario.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-paragrafo',
  imports: [ModuloGeneralModule],
  templateUrl: './paragrafo.component.html',
  styleUrl: './paragrafo.component.css'
})
export class ParagrafoComponent {
  data: any;
  Tabla: string = 'paragrafo';

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
          { name: 'fkidarticulo', label: 'Articulo', type: 'text', fk: true, value: '', strTable: "articulo", validators: ['required'] }
        ]
      };
    } else if (tipo === 'U') {
      formSchema = {
        fields: [
          { name: 'descripcion', label: 'Descripción', type: 'text', value: row.descripcion, validators: ['required'] },
          { name: 'fkidarticulo', label: 'Articulo', type: 'text', fk: true, value: row.fkidarticulo, strTable: "articulo", validators: ['required'] }
        ]
      };
    } else if (tipo === 'D') {
      formSchema = {
        fields: [
          { name: 'descripcion', label: 'Descripción', type: 'text', value: row.descripcion, disabled: true },
          { name: 'fkidarticulo', label: 'Artículo', type: 'text', fk: true, value: row.fkidarticulo, strTable: "articulo", disabled: true }
        ]
      };
    }

    const modalRef = this.modal.openDynamicModal(formSchema, tipo, this.Tabla);

    modalRef.result
      .then(() => this.TraerTabla())
      .catch(error => console.error('Error en el modal:', error));
  }
}
