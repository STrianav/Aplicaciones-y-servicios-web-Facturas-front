import { Component } from '@angular/core';
import { ModuloGeneralModule } from '../../../../shared/modulo-general.module';
import { ApiService } from '../../../../Api/api.service';
import { FormularioService } from '../../Formulario/formulario.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-literal',
  imports: [ModuloGeneralModule],
  templateUrl: './literal.component.html',
  styleUrl: './literal.component.css'
})
export class LiteralComponent {
  data: any;
  Tabla: string = 'literal';
  rolesJson = sessionStorage.getItem("roles");
  roles: string[] = []
  filtroTexto: string = '';
  dataFiltrada: any[] = [];

  constructor(private api: ApiService,
    private modal: FormularioService) { }

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
      formSchema = {
        fields: [
          { name: 'descripcion', label: 'Descripción', type: 'text', value: '', validators: ['required'] },
          { name: 'fkidarticulo', label: 'Artículo', type: 'text', fk: true, value: '', strTable: "articulo", validators: ['required'] }
        ]
      };
    } else if (tipo === 'U') {
      formSchema = {
        fields: [
          { name: 'descripcion', label: 'Descripción', type: 'text', value: row.descripcion, validators: ['required'] },
          { name: 'fkidarticulo', label: 'Artículo', type: 'text', fk: true, value: row.fkidarticulo, strTable: "articulo", validators: ['required'] }
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
