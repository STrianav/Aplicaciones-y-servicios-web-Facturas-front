import { Component } from '@angular/core';
import { ModuloGeneralModule } from '../../../../shared/modulo-general.module';
import { ApiService } from '../../../../Api/api.service';
import { FormularioService } from '../../Formulario/formulario.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-frecuencia',
  imports: [ModuloGeneralModule],
  templateUrl: './frecuencia.component.html',
  styleUrl: './frecuencia.component.css'
})
export class FrecuenciaComponent {
  data: any;
  Tabla: string = 'frecuencia';

  constructor(private api: ApiService,
    private modal: FormularioService) { }

  ngOnInit(): void {
    this.TraerTabla();
  }

  async TraerTabla() {
    try {
      let data = await firstValueFrom(this.api.TraerTabla(this.Tabla));
      this.data = data;
      console.log('datos:', data)
    } catch (error) {
      console.error('Error al obtener la tabla:', error);
    }
  }

  Crudd(tipo: 'C' | 'U' | 'D', row?: any) {
    let formSchema: any;
    if (tipo === 'C') {
      formSchema = {
        fields: [
          { name: 'nombre', label: 'Nombre', type: 'text', value: '', validators: ['required'] }
        ]
      };
    } else if (tipo === 'U') {
      formSchema = {
        fields: [
          { name: 'nombre', label: 'Nombre', type: 'text', value: row.nombre, validators: ['required'] }
        ]
      };
    } else if (tipo === 'D') {
      formSchema = {
        fields: [
          { name: 'nombre', label: 'Nombre', type: 'text', value: row.nombre, validators: ['required'] }
        ]
      };
    }
    const modalRef = this.modal.openDynamicModal(formSchema, tipo, this.Tabla);

    modalRef.result.then(() => {
      this.TraerTabla();
    });
  }
}

