import { Component } from '@angular/core';
import { ApiService } from '../../../../Api/api.service';
import { FormularioService } from '../../Formulario/formulario.service';
import { firstValueFrom } from 'rxjs';
import { ModuloGeneralModule } from '../../../../shared/modulo-general.module';

@Component({
  selector: 'app-unidadmedicion',
  imports: [ModuloGeneralModule],
  templateUrl: './unidadmedicion.component.html',
  styleUrl: './unidadmedicion.component.css'
})
export class UnidadmedicionComponent {
  data: any;
  Tabla: string = 'unidadmedicion';

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
          { name: 'descripcion', label: 'Descripcion', type: 'text', value: '', validators: ['required'] }
        ]
      };
    } else if (tipo === 'U') {
      formSchema = {
        fields: [
          { name: 'descripcion', label: 'Descripcion', type: 'text', value: row.descripcion, validators: ['required'] }
        ]
      };
    } else if (tipo === 'D') {
      formSchema = {
        fields: [
          { name: 'descripcion', label: 'Descripcion', type: 'text', value: row.descripcion, validators: ['required'] }
        ]
      };
    }
    const modalRef = this.modal.openDynamicModal(formSchema, tipo, this.Tabla);

    modalRef.result.then(() => {
      this.TraerTabla();
    });
  }
}


