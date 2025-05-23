import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FormularioService } from '../../Formulario/formulario.service';
import { ApiService } from '../../../../Api/api.service';
import { ModuloGeneralModule } from '../../../../shared/modulo-general.module';
import { GeneralServiceService } from '../../../../GeneralService';

@Component({
  selector: 'app-indicador',
  imports: [ModuloGeneralModule],
  templateUrl: './indicador.component.html',
  styleUrl: './indicador.component.css'
})
export class IndicadorComponent {
  data: any;
  Tabla: string = 'indicador';
  rolesJson = sessionStorage.getItem("roles");
  roles: string[] = []
  filtroTexto: string = '';
  dataFiltrada: any[] = [];

  constructor(private api: ApiService,
    private modal: FormularioService, private general: GeneralServiceService) { }

  ngOnInit(): void {
    this.TraerTabla();
    this.roles = this.rolesJson ? JSON.parse(this.rolesJson) : [];
  }

  filtrarTabla() {
    const texto = this.filtroTexto.toLowerCase();

    this.dataFiltrada = this.data.filter((item: { [s: string]: unknown; } | ArrayLike<unknown>) =>
      Object.values(item).some(valor =>
        valor?.toString().toLowerCase().includes(texto)
      )
    );
  }

  async TraerTabla() {
    try {
      this.data = await firstValueFrom(this.api.TraerTabla(this.Tabla));
      this.dataFiltrada = this.data;
    } catch (error) {
      console.error('Error al obtener la tabla:', error);
    }
  }

  Crudd(tipo: 'C' | 'U' | 'D', row?: any) {
    let formSchema: any;
    if (tipo === 'C') {
      const result = this.modal.openModalIndicador();
      result.result.then((data) => {
        if (data)
          this.TraerTabla();
      })
      return;
    } else if (tipo === 'U' && row) {
      formSchema = {
        fields: [
          { name: 'codigo', label: 'Código', type: 'text', value: row.codigo, validators: ['required'] },
          { name: 'nombre', label: 'Nombre', type: 'text', value: row.nombre, validators: ['required'] },
          { name: 'objetivo', label: 'Objetivo', type: 'text', value: row.objetivo, validators: ['required'] },
          { name: 'alcance', label: 'Alcance', type: 'text', value: row.alcance, validators: ['required'] },
          { name: 'formula', label: 'Fórmula', type: 'text', value: row.formula, validators: ['required'] },
          { name: 'fkidtipoindicador', label: 'Tipo de Indicador ', type: 'text', fk: true, value: row.fkidtipoindicador, strTable: "tipoindicador", validators: ['required'] },
          { name: 'fkidunidadmedicion', label: 'Unidad de Medición', type: 'text', fk: true, value: row.fkidunidadmedicion, strTable: "unidadmedicion", validators: ['required'] },
          { name: 'meta', label: 'Meta', type: 'text', value: row.meta, validators: ['required'] },
          { name: 'fkidsentido', label: 'Sentido', type: 'text', fk: true, value: row.fkidsentido, strTable: "sentido", validators: ['required'] },
          { name: 'fkidfrecuencia', label: 'Frecuencia', type: 'text', fk: true, value: row.fkidfrecuencia, strTable: "frecuencia", validators: ['required'] },
          { name: 'fkidarticulo', label: 'Artículo', type: 'text', fk: true, value: row.fkidarticulo, strTable: "articulo", validators: ['required'] },
          { name: 'fkidliteral', label: 'Literal', type: 'text', fk: true, value: row.fkidliteral, strTable: "literal", validators: ['required'] },
          { name: 'fkidnumeral', label: 'Numeral', type: 'text', fk: true, value: row.fkidnumeral, strTable: "numeral", validators: ['required'] },
          { name: 'fkidparagrafo', label: 'Paragrafo', type: 'text', fk: true, value: row.fkidparagrafo, strTable: "paragrafo", validators: ['required'] }
        ]
      };
    } else if (tipo === 'D' && row) {
      formSchema = {
        fields: [
          { name: 'codigo', label: 'Código', type: 'text', value: row.codigo, validators: [''] },
          { name: 'nombre', label: 'Nombre', type: 'text', value: row.nombre, validators: [''] },
          { name: 'objetivo', label: 'Objetivo', type: 'text', value: row.objetivo, validators: [''] },
          { name: 'alcance', label: 'Alcance', type: 'text', value: row.alcance, validators: [''] },
          { name: 'formula', label: 'Fórmula', type: 'text', value: row.formula, validators: [''] },
          { name: 'fkidtipoindicador', label: 'Tipo de Indicador ', type: 'text', fk: true, value: row.fkidtipoindicador, strTable: "tipoindicador", validators: [''] },
          { name: 'fkidunidadmedicion', label: 'Unidad de Medición', type: 'text', fk: true, value: row.fkidunidadmedicion, strTable: "unidadmedicion", validators: [''] },
          { name: 'meta', label: 'Meta', type: 'text', value: row.meta, validators: [''] },
          { name: 'fkidsentido', label: 'Sentido', type: 'text', fk: true, value: row.fkidsentido, strTable: "sentido", validators: [''] },
          { name: 'fkidfrecuencia', label: 'Frecuencia', type: 'text', fk: true, value: row.fkidfrecuencia, strTable: "frecuencia", validators: [''] },
          { name: 'fkidarticulo', label: 'Artículo', type: 'text', fk: true, value: row.fkidarticulo, strTable: "articulo", validators: [''] },
          { name: 'fkidliteral', label: 'Literal', type: 'text', fk: true, value: row.fkidliteral, strTable: "literal", validators: [''] },
          { name: 'fkidnumeral', label: 'Numeral', type: 'text', fk: true, value: row.fkidnumeral, strTable: "numeral", validators: [''] },
          { name: 'fkidparagrafo', label: 'Paragrafo', type: 'text', fk: true, value: row.fkidparagrafo, strTable: "paragrafo", validators: [''] }
        ]
      };
    }
    const modalRef = this.modal.openDynamicModal(formSchema, tipo, this.Tabla);

    modalRef.result.then(() => {
      this.TraerTabla();
    });
  }

  async Consultas(consulta: string) {
    try {
      const data: any[] = await firstValueFrom(this.api.Consultas(consulta))
      if (data.length > 0)
        this.modal.openConsultas(data, consulta)
    }
    catch {
      this.general.showAlert("En este momento no se puede mostrar la información", "info", false, 3000);
    }
  }
}

