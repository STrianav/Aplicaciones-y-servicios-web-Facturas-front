import { Component, Inject, Input } from '@angular/core';
import { ModuloGeneralModule } from '../../../shared/modulo-general.module';
import { Router } from '@angular/router';
import { RespuestaMenu } from '../../../models/Menu';

@Component({
  selector: 'app-menu',
  imports: [ModuloGeneralModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  @Input() isOpen: boolean = false;

  constructor(private router: Router) { }

  menus: RespuestaMenu[] = [
    {
      menu_ID: 1,
      menu_Descripcion: 'Frecuencia',
      icono: 'bi bi-graph-up',
      url_o_Componente: 'frecuencia'
    },
    {
      menu_ID: 2,
      menu_Descripcion: 'Fuente',
      icono: 'bi bi-book',
      url_o_Componente: 'fuente'
    },
    {
      menu_ID: 3,
      menu_Descripcion: 'Represen Visual',
      icono: 'bi bi-image',
      url_o_Componente: 'represenvisual'
    },
    {
      menu_ID: 4,
      menu_Descripcion: 'Tipo Indicador',
      icono: 'bi bi-bar-chart-line',
      url_o_Componente: 'tipoindicador'
    },
    {
      menu_ID: 5,
      menu_Descripcion: 'Rol',
      icono: 'bi bi-person-check',
      url_o_Componente: 'rol'
    },
    {
      menu_ID: 6,
      menu_Descripcion: 'Usuario',
      icono: 'bi bi-person',
      url_o_Componente: 'usuario'
    },
    {
      menu_ID: 7,
      menu_Descripcion: 'Seccion',
      icono: 'bi bi-layout-text-sidebar',
      url_o_Componente: 'seccion'
    },
    {
      menu_ID: 8,
      menu_Descripcion: 'Sentido',
      icono: 'bi bi-compass',
      url_o_Componente: 'sentido'
    },
    {
      menu_ID: 9,
      menu_Descripcion: 'Sub Sección',
      icono: 'bi bi-layout-split',
      url_o_Componente: 'subseccion'
    },
    {
      menu_ID: 10,
      menu_Descripcion: 'Tipo Actor',
      icono: 'bi bi-people',
      url_o_Componente: 'tipoactor'
    },
    {
      menu_ID: 11,
      menu_Descripcion: 'Unidad Medición',
      icono: 'bi bi-rulers',
      url_o_Componente: 'unidadmedicion'
    },
    {
      menu_ID: 12,
      menu_Descripcion: 'Articulo',
      icono: 'bi bi-file-earmark-text',
      url_o_Componente: 'articulo'
    },
    {
      menu_ID: 13,
      menu_Descripcion: 'Indicador',
      icono: 'bi bi-graph-up',
      url_o_Componente: 'indicador'
    },
    {
      menu_ID: 14,
      menu_Descripcion: 'Literal',
      icono: 'bi bi-journal-text',
      url_o_Componente: 'literal'
    },
    {
      menu_ID: 15,
      menu_Descripcion: 'Numeral',
      icono: 'bi bi-list-ol',
      url_o_Componente: 'numeral'
    },
    {
      menu_ID: 16,
      menu_Descripcion: 'Paragrafo',
      icono: 'bi bi-card-text',
      url_o_Componente: 'paragrafo'
    },
    {
      menu_ID: 17,
      menu_Descripcion: 'Resultado Indicador',
      icono: 'bi bi-check2-circle',
      url_o_Componente: 'resultadoindicador'
    },
    {
      menu_ID: 18,
      menu_Descripcion: 'Variable',
      icono: 'bi bi-sliders',
      url_o_Componente: 'variable'
    },
    {
      menu_ID: 19,
      menu_Descripcion: 'Variables Por Indicador',
      icono: 'bi bi-diagram-3',
      url_o_Componente: 'variablesporindicador'
    },
    {
      menu_ID: 20,
      menu_Descripcion: 'Rol Usuario',
      icono: 'bi bi-person-badge',
      url_o_Componente: 'rol_usuario'
    },
    {
      menu_ID: 21,
      menu_Descripcion: 'Actor',
      icono: 'bi bi-person-lines-fill',
      url_o_Componente: 'actor'
    }
  ]

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  onMenuSelect(menu: any): void {
    this.router.navigate(['navegador/' + menu]);
  }
}
