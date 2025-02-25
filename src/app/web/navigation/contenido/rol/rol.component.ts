import { Component } from '@angular/core';
import { ApiService } from '../../../../Api/api.service';
import { FormularioService } from '../../Formulario/formulario.service';
import { ModuloGeneralModule } from '../../../../shared/modulo-general.module';

@Component({
  selector: 'app-rol',
  imports: [ModuloGeneralModule],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.css'
})
export class RolComponent {
  data: any;
  Tabla: string = 'rol';

  constructor(private api: ApiService, private modal: FormularioService) { }

  ngOnInit(): void {
    this.TraerTabla();
  }

  TraerTabla() {
    this.api.TraerTabla(this.Tabla).subscribe((data) => {
      this.data = data;
    }, (error) => {
      console.error(error);
    })
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
          { name: 'nombre', label: 'Nombre', type: 'text', value: row.nombre, validators: [] }
        ]
      };
    }
    const modalRef = this.modal.openDynamicModal(formSchema, tipo, this.Tabla);

    modalRef.result.then(() => {
      this.TraerTabla();
    });
  }
}