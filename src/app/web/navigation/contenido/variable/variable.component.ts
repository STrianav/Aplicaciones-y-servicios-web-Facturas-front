import { Component } from '@angular/core';
import { ModuloGeneralModule } from '../../../../shared/modulo-general.module';
import { ApiService } from '../../../../Api/api.service';
import { FormularioService } from '../../Formulario/formulario.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-variable',
  imports: [ModuloGeneralModule],
  templateUrl: './variable.component.html',
  styleUrl: './variable.component.css'
})
export class VariableComponent {
  data: any;
  Tabla: string = 'variable';

  constructor(private api: ApiService, private modal: FormularioService) { }

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
          { name: 'nombre', label: 'Nombre', type: 'text', value: '', validators: ['required'] },
          { name: 'fechacreacion', label: 'Fecha de Creación', type: 'datetime-local', value: '', disabled: true },
          { name: 'fkemailusuario', label: 'Usuario', type: 'email', value: '', fk: true, strTable: 'usuario', validators: ['required'] }
        ]
      };
    } else if (tipo === 'U') {
      formSchema = {
        fields: [
          { name: 'nombre', label: 'Nombre', type: 'text', value: row.nombre, validators: ['required'] },
          { name: 'fechacreacion', label: 'Fecha de Creación', type: 'datetime-local', value: row.fechacreacion, disabled: true },
          { name: 'fkemailusuario', label: 'Usuario', type: 'email', value: row.fkemailusuario, fk: true, strTable: 'usuario', validators: ['required'] }
        ]
      };
    } else if (tipo === 'D') {
      formSchema = {
        fields: [
          { name: 'nombre', label: 'Nombre', type: 'text', value: row.nombre, validators: ['required'] },
          { name: 'fechacreacion', label: 'Fecha de Creación', type: 'datetime-local', value: row.fechacreacion, disabled: true },
          { name: 'fkemailusuario', label: 'Usuario', type: 'email', value: row.fkemailusuario, fk: true, strTable: 'usuario', validators: ['required'] }
        ]
      };
    }

    const modalRef = this.modal.openDynamicModal(formSchema, tipo, this.Tabla);

    modalRef.result
      .then(() => this.TraerTabla())
      .catch(error => console.error('Error en el modal:', error));
  }
}
