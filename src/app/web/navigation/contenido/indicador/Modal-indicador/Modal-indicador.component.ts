import { Component, inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormSchema } from '../../../../../models/FormularioModal';
import { ModuloGeneralModule } from '../../../../../shared/modulo-general.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../../../../Api/api.service';
import { GeneralServiceService } from '../../../../../GeneralService';

@Component({
  imports: [ModuloGeneralModule],
  selector: 'app-Modal-indicador',
  templateUrl: './Modal-indicador.component.html',
  styleUrls: ['./Modal-indicador.component.css']
})
export class ModalIndicadorComponent implements OnInit {
  activeModal = inject(NgbActiveModal);
  fb = inject(FormBuilder);
  api = inject(ApiService);
  general = inject(GeneralServiceService);
  Formulario: { [key: string]: any[] } = {};

  steps: string[] = [];
  currentStep = 0;

  formGroups: FormGroup[] = [];
  formKeys: string[][] = [];
  listEntries: any[][] = [];
  foreignData: any = {};

  constructor() {
    this.Formulario = {
      indicador: [
        { name: 'codigo', label: 'Código', type: 'text', validators: ['required'] },
        { name: 'nombre', label: 'Nombre', type: 'text', validators: ['required'] },
        { name: 'objetivo', label: 'Objetivo', type: 'text', validators: ['required'] },
        { name: 'alcance', label: 'Alcance', type: 'text', validators: ['required'] },
        { name: 'formula', label: 'Fórmula', type: 'text', validators: ['required'] },
        { name: 'fkidtipoindicador', label: 'Tipo de Indicador ', type: 'text', fk: true, strTable: "tipoindicador", validators: ['required'] },
        { name: 'fkidunidadmedicion', label: 'Unidad de Medición', type: 'text', fk: true, strTable: "unidadmedicion", validators: ['required'] },
        { name: 'meta', label: 'Meta', type: 'text', validators: ['required'] },
        { name: 'fkidsentido', label: 'Sentido', type: 'text', fk: true, strTable: "sentido", validators: ['required'] },
        { name: 'fkidfrecuencia', label: 'Frecuencia', type: 'text', fk: true, strTable: "frecuencia", validators: ['required'] },
        { name: 'fkidarticulo', label: 'Artículo', type: 'text', fk: true, strTable: "articulo", validators: ['required'] },
        { name: 'fkidliteral', label: 'Literal', type: 'text', fk: true, strTable: "literal", validators: ['required'] },
        { name: 'fkidnumeral', label: 'Numeral', type: 'text', fk: true, strTable: "numeral", validators: ['required'] },
        { name: 'fkidparagrafo', label: 'Paragrafo', type: 'text', fk: true, strTable: "paragrafo", validators: ['required'] }
      ],
      responsablesporindicador: [
        { name: 'fkidresponsable', label: 'Actor', type: 'text', fk: true, strTable: 'actor', validators: ['required'] },
        { name: 'fechaasignacion', label: 'Fecha asignación', type: 'datetime' }
      ],
      resultadoindicador: [
        { name: 'resultado', label: 'Código', type: 'float', validators: ['required'] },
        { name: 'fechacalculo', label: 'Fecha calculo', type: 'datetime' }
      ],
      variablesporindicador: [
        { name: 'fkidvariable', label: 'Variable', type: 'text', fk: true, strTable: "variable", validators: ['required'] },
        { name: 'fkemailusuario', label: 'Email', type: 'text', fk: true, strTable: "usuario", validators: ['required'] },
        { name: 'dato', label: 'Dato', type: 'float', validators: ['required'] },
        { name: 'fechadato', label: 'Fecha Dato', type: 'datetime' }
      ],
      represenvisualporindicador: [
        { name: 'fkidrepresenvisual', label: 'Represen Visual', type: 'text', fk: true, strTable: "represenvisual", validators: ['required'] },

      ]
    }
    this.steps = Object.keys(this.Formulario)
  }

  async ngOnInit() {
    this.steps = Object.keys(this.Formulario);

    this.steps.forEach((step, index) => {
      const group: any = {};
      const keys: string[] = [];

      this.Formulario[step].forEach((field: any) => {
        if (!field.name) return;
        const validators = field.validators?.includes('required') ? [Validators.required] : [];
        group[field.name] = new FormControl('', validators);
        keys.push(field.name);
      });

      this.formGroups.push(this.fb.group(group));
      this.formKeys.push(keys);
      this.listEntries.push([]);
    });
    await this.loadForeignKeys();
  }

  async loadForeignKeys() {
    try {
      for (const section of this.steps) {
        const fields = this.Formulario[section];
        for (const field of fields) {
          if (field.fk && field.strTable && !this.foreignData[field.name]) {
            const data = await this.getForeignData(field.strTable); // si falla, se lanza excepción aquí y se detiene todo
            this.foreignData[field.name] = data.map((item: any) => ({
              id: item.id || item.Id || item.codigo || item.codigo_id || item.pk || item.email || item[field.name] || 'SIN_ID',
              label: item.nombre || item.descripcion || item.label || item.email || JSON.stringify(item)
            }));
          }
        }
      }
    } catch (error) {
      console.error('⛔ Error crítico: Deteniendo carga de claves foráneas:', error);
    }
  }


  async getForeignData(table: string): Promise<any[]> {
    try {
      if (!table) throw new Error('Nombre de tabla no definido');
      return await firstValueFrom(this.api.TraerTabla(table));
    } catch (error) {
      console.error(`Error al obtener datos de la tabla "${table}":`, error);
      return [];
    }
  }

  cancel() {
    this.activeModal.dismiss(false);  // Devuelve false cuando se cancela
  }

  getLabel(stepIndex: number, fieldName: string): string {
    return this.Formulario[this.steps[stepIndex]].find((f: any) => f.name === fieldName)?.label || fieldName;
  }

  getType(stepIndex: number, fieldName: string): string {
    const tipo = this.Formulario[this.steps[stepIndex]].find((f: any) => f.name === fieldName)?.type;
    if (tipo === 'datetime') return 'datetime-local';
    if (tipo === 'float') return 'number';
    return tipo || 'text';
  }

  isFK(stepIndex: number, fieldName: string): boolean {
    return this.Formulario[this.steps[stepIndex]].some((f: any) => f.name === fieldName && f.fk);
  }

  getFKOptions(fieldName: string): any[] {
    return this.foreignData[fieldName] || [];
  }

  goToStep(index: number): void {
    this.currentStep = index;
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) this.currentStep++;
  }

  prevStep(): void {
    if (this.currentStep > 0) this.currentStep--;
  }

  addEntry(): void {
    if (this.formGroups[this.currentStep].valid) {
      this.listEntries[this.currentStep].push(this.formGroups[this.currentStep].value);
      this.formGroups[this.currentStep].reset();
    }
  }

  removeEntry(index: number): void {
    this.listEntries[this.currentStep].splice(index, 1);
  }

  async onSave(): Promise<void> {
    const finalData: any = {};
    this.steps.forEach((step, index) => {
      if (index === 0) {
        finalData[step] = this.formGroups[index].value;
      } else {
        finalData[step] = this.listEntries[index];
      }
    });

    const response = await firstValueFrom(this.api.GuardarIndicador(finalData));

    if (response.mensaje = 'Indicador y sus relaciones guardados correctamente') {
      this.general.showAlert(response.mensaje, "success", true, 3000).then(() => {
        this.activeModal.close(true);
        return
      });
    } else {
      this.general.showAlert("No se pudo guardar la información. Por favor, verifica que todos los campos estén correctamente diligenciados.", "error", false, 0);
    }
  }

}
