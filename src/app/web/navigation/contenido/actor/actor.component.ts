import { Component } from '@angular/core';
import { ModuloGeneralModule } from '../../../../shared/modulo-general.module';
import { ApiService } from '../../../../Api/api.service';
import { FormularioService } from '../../Formulario/formulario.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-actor',
  imports: [ModuloGeneralModule],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.css'
})
export class ActorComponent {
  data: any;
  Tabla: string = 'actor';
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
          { name: 'nombre', label: 'Nombre', type: 'text', value: '', validators: ['required'] },
          { name: 'fkidtipoactor', label: 'Tipo de Actor', type: 'number', fk: true, value: '', strTable: "tipoactor", validators: ['required'] }
        ]
      };
    } else if (tipo === 'U') {
      formSchema = {
        fields: [
          { name: 'nombre', label: 'Nombre', type: 'text', value: row.nombre, validators: ['required'] },
          { name: 'fkidtipoactor', label: 'Tipo de Actor', type: 'number', fk: true, value: row.fkidtipoactor, strTable: "tipoactor", validators: ['required'] }
        ]
      };
    } else if (tipo === 'D') {
      formSchema = {
        fields: [
          { name: 'nombre', label: 'Nombre', type: 'text', value: row.nombre, validators: ['required'] },
          { name: 'fkidtipoactor', label: 'Tipo de Actor', type: 'number', fk: true, value: row.fkidtipoactor, strTable: "tipoactor", validators: ['required'] }
        ]
      };
    }
    const modalRef = this.modal.openDynamicModal(formSchema, tipo, this.Tabla);

    modalRef.result.then(() => {
      this.TraerTabla();
    });
  }
}
