import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FormularioService } from '../../Formulario/formulario.service';
import { ApiService } from '../../../../Api/api.service';
import { ModuloGeneralModule } from '../../../../shared/modulo-general.module';

@Component({
  selector: 'app-rol-usuario',
  imports: [ModuloGeneralModule],
  templateUrl: './rol-usuario.component.html',
  styleUrl: './rol-usuario.component.css'
})
export class RolUsuarioComponent {
  data: any;
  Tabla: string = 'rol_usuario';
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
          { name: 'fkidrol', label: 'Rol', type: 'text', fk: true, value: '', strTable: "rol", validators: ['required'] },
          { name: 'fkemail', label: 'Email Usuario', type: 'text', fk: true, value: '', strTable: "usuario", validators: ['required'] },
        ]
      };
    } else if (tipo === 'U' && row) {
      formSchema = {
        fields: [
          { name: 'fkidrol', label: 'Rol', type: 'text', fk: true, value: row.fkidrol, strTable: "rol", validators: ['required'] },
          { name: 'fkemail', label: 'Email Usuario', type: 'text', fk: true, value: row.fkemail, strTable: "usuario", validators: ['required'] },
        ]
      };
    } else if (tipo === 'D' && row) {
      formSchema = {
        fields: [
          { name: 'fkidrol', label: 'Rol', type: 'text', fk: true, value: row.fkidrol, strTable: "rol", validators: [''] },
          { name: 'fkemail', label: 'Email Usuario', type: 'text', fk: true, value: row.fkemail, strTable: "usuario", validators: [''] },
        ]
      };
    }
    const modalRef = this.modal.openDynamicModal(formSchema, tipo, this.Tabla);

    modalRef.result.then(() => {
      this.TraerTabla();
    });
  }
}

