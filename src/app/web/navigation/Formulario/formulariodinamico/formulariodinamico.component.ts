import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuloGeneralModule } from '../../../../shared/modulo-general.module';
import { FormSchema } from '../../../../models/FormularioModal';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../Api/api.service';
import { GeneralServiceService } from '../../../../GeneralService';

@Component({
  selector: 'app-formulariodinamico',
  imports: [ModuloGeneralModule],
  templateUrl: './formulariodinamico.component.html',
  styleUrl: './formulariodinamico.component.css'
})
export class FormulariodinamicoComponent {
  @Input() formSchema!: FormSchema;
  @Input() Tabla: string = '';
  @Input() crudd: 'C' | 'U' | 'D' = 'C';
  activeModal = inject(NgbActiveModal);
  form!: FormGroup;
  originalData: any;

  constructor(private fb: FormBuilder, private api: ApiService, private generalService: GeneralServiceService) { }

  ngOnInit(): void {
    this.createForm();
    this.originalData = { ...this.form.value };
  }

  createForm(): void {
    const group: any = {};
    this.formSchema.fields.forEach(field => {
      group[field.name] = [field.value, this.getValidators(field.validators)];
    });
    this.form = this.fb.group(group);
  }

  getValidators(validators?: string[]) {
    const formValidators: any[] = [];
    if (validators) {
      validators.forEach(v => {
        if (v === 'required') {
          formValidators.push(Validators.required);
        }
        if (v === 'email') {
          formValidators.push(Validators.email);
        }
      });
    }
    return formValidators;
  }

  onSave(): void {
    if (this.form.valid) {
      this.api.CrearData(this.Tabla, this.form.value).subscribe((data) => {
      }, (error) => {
        if (error.status == 200) {
          this.generalService.showAlert("Se guardo correctamente.", "success", true, 2500).then(() => {
            this.activeModal.close();
          })
        } else {
          this.generalService.showAlert("No se pudo guardar la información, intentalo mas tarde.", "error", false, 0)
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  onEdit(): void {
    if (this.form.valid) {
      // 1️⃣ Obtener los valores originales del formulario
      const originalData = this.originalData || {}; // Almacenar antes de modificar

      // 2️⃣ Filtrar solo los campos modificados
      const modifiedData = Object.keys(this.form.value).reduce((acc, key) => {
        if (this.form.value[key] !== originalData[key]) {
          acc[key] = this.form.value[key];
        }
        return acc;
      }, {} as any);

      // 3️⃣ Obtener el primer campo clave (antes y después de la edición)
      const firstKey = Object.keys(modifiedData)[0];

      // 4️⃣ Usar el valor original de la clave primaria para el `where`
      const whereKey = firstKey; // Clave a buscar
      const whereValue = originalData[whereKey]; // Valor original (antes de ser modificado)

      if (Object.keys(modifiedData).length > 0) {
        this.api.EditarData(this.Tabla, whereKey, whereValue, modifiedData).subscribe(
          (data) => { },
          (error) => {
            if (error.status == 200) {
              this.generalService.showAlert("Se edito correctamente.", "success", true, 2500).then(() => {
                this.activeModal.close();
              })
            } else {
              this.generalService.showAlert("No se pudo editar la información, intentalo mas tarde.", "error", false, 0)
            }
          }
        );
      } else {
        alert("No hay cambios para actualizar.");
      }
    } else {
      this.form.markAllAsTouched();
    }
  }



  onDelete(): void {
    if (this.form.valid) {
      // 1️⃣ Obtener los valores originales del formulario
      const originalData = this.originalData || {}; // Asegurar los datos originales

      // 2️⃣ Obtener la clave primaria (asumiendo que es el primer campo en el formulario)
      const whereKey = Object.keys(originalData)[0]; // Primer campo clave del objeto original
      const whereValue = originalData[whereKey]; // Valor original de la clave primaria

      if (!whereKey || !whereValue) {
        alert("No se pudo determinar el identificador del registro a eliminar.");
        return;
      }

      // 3️⃣ Llamar a la API para eliminar
      this.api.EliminarData(this.Tabla, whereKey, whereValue).subscribe(
        (data) => { },
        (error) => {
          if (error.status == 200) {
            this.generalService.showAlert("Se elimino correctamente.", "success", true, 2500).then(() => {
              this.activeModal.close();
            })
          } else {
            this.generalService.showAlert("No se pudo eliminar la información, intentalo mas tarde.", "error", false, 0)
          }
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancel() {
    this.activeModal.dismiss(false);  // Devuelve false cuando se cancela
  }
}
