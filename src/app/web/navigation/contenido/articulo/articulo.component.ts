import { Component } from '@angular/core';
import { ModuloGeneralModule } from '../../../../shared/modulo-general.module';
import { ApiService } from '../../../../Api/api.service';
import { FormularioService } from '../../Formulario/formulario.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-articulo',
  imports: [ModuloGeneralModule],
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.css'
})
export class ArticuloComponent {
  data: any;
  Tabla: string = 'articulo';

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
          { name: 'nombre', label: 'Nombre', type: 'text', value: '', validators: ['required'] },
          { name: 'descripcion', label: 'Descripción', type: 'text', value: '', validators: ['required'] },
          { name: 'fkidseccion', label: 'Sección', type: 'text', fk: true, value: '', strTable: "seccion", validators: ['required'] },
          { name: 'fkidsubseccion', label: 'Subsección', type: 'text', fk: true, value: '', strTable: "subseccion", validators: ['required'] }
        ]
      };
    } else if (tipo === 'U') {
      formSchema = {
        fields: [
          { name: 'id', label: 'id', type: 'text', value: row.id, validators: ['required'] },
          { name: 'nombre', label: 'Nombre', type: 'text', value: row.nombre, validators: ['required'] },
          { name: 'descripcion', label: 'Descripción', type: 'text', value: row.descripcion, validators: ['required'] },
          { name: 'fkidseccion', label: 'Sección', type: 'text', fk: true, value: row.fkidseccion, strTable: "seccion", validators: ['required'] },
          { name: 'fkidsubseccion', label: 'Subsección', type: 'text', fk: true, value: row.fkidsubseccion, strTable: "subseccion", validators: ['required'] }
        ]
      };
    } else if (tipo === 'D') {
      formSchema = {
        fields: [
          { name: 'id', label: 'id', type: 'text', value: row.id, validators: ['required'] },
          { name: 'nombre', label: 'Nombre', type: 'text', value: row.nombre, validators: ['required'] },
          { name: 'descripcion', label: 'Descripción', type: 'text', value: row.descripcion, validators: ['required'] },
          { name: 'fkidseccion', label: 'Sección', type: 'text', fk: true, value: row.fkidseccion, strTable: "seccion", validators: ['required'] },
          { name: 'fkidsubseccion', label: 'Subsección', type: 'text', fk: true, value: row.fkidsubseccion, strTable: "subseccion", validators: ['required'] }
        ]
      };
    }
    const modalRef = this.modal.openDynamicModal(formSchema, tipo, this.Tabla);

    modalRef.result.then(() => {
      this.TraerTabla();
    });
  }
}
