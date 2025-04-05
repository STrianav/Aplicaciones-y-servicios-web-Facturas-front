import { Component } from '@angular/core';
import { ModuloGeneralModule } from '../../../../shared/modulo-general.module';
import { ApiService } from '../../../../Api/api.service';
import { FormularioService } from '../../Formulario/formulario.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-usuario',
  imports: [ModuloGeneralModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  data: any;
  Tabla: string = 'usuario';

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
          { name: 'email', label: 'Correo Electrónico', type: 'email', value: '', validators: ['required', 'email'] },
          { name: 'contrasena', label: 'Contraseña', type: 'password', value: '', validators: ['required'] }
        ]
      };
    } else if (tipo === 'U') {
      formSchema = {
        fields: [
          { name: 'email', label: 'Correo Electrónico', type: 'email', value: row.email, validators: ['required', 'email'] },
          { name: 'contrasena', label: 'Contraseña', type: 'password', value: row.contrasena, validators: ['required'] }
        ]
      };
    } else if (tipo === 'D') {
      formSchema = {
        fields: [
          { name: 'email', label: 'Correo Electrónico', type: 'email', value: row.email, validators: [] },
          { name: 'contrasena', label: 'Contraseña', type: 'password', value: row.contrasena, validators: [] }
        ]
      };
    }
    const modalRef = this.modal.openDynamicModal(formSchema, tipo, this.Tabla);

    modalRef.result.then(() => {
      this.TraerTabla();
    });
  }
}
