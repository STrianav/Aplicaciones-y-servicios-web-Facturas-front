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
      menu_Descripcion: 'frecuencia',
      icono: 'bi bi-graph-up',
      url_o_Componente: 'frecuencia'
    },
    {
      menu_ID: 2,
      menu_Descripcion: 'fuente',
      icono: 'bi bi-book',
      url_o_Componente: 'fuente'
    },
    {
      menu_ID: 3,
      menu_Descripcion: 'represenvisual',
      icono: 'bi bi-image',
      url_o_Componente: 'represenvisual'
    },
    {
      menu_ID: 4,
      menu_Descripcion: 'tipoindicador',
      icono: 'bi bi-bar-chart-line',
      url_o_Componente: 'tipoindicador'
    },
    {
      menu_ID: 5,
      menu_Descripcion: 'rol',
      icono: 'bi bi-person-check',
      url_o_Componente: 'rol'
    },
    {
      menu_ID: 6,
      menu_Descripcion: 'usuario',
      icono: 'bi bi-person',
      url_o_Componente: 'usuario'
    },
    {
      menu_ID: 7,
      menu_Descripcion: 'seccion',
      icono: 'bi bi-layout-text-sidebar',
      url_o_Componente: 'seccion'
    },
    {
      menu_ID: 8,
      menu_Descripcion: 'sentido',
      icono: 'bi bi-compass',
      url_o_Componente: 'sentido'
    },
    {
      menu_ID: 9,
      menu_Descripcion: 'subseccion',
      icono: 'bi bi-layout-split',
      url_o_Componente: 'subseccion'
    },
    {
      menu_ID: 10,
      menu_Descripcion: 'tipoactor',
      icono: 'bi bi-people',
      url_o_Componente: 'tipoactor'
    },
    {
      menu_ID: 11,
      menu_Descripcion: 'unidadmedicion',
      icono: 'bi bi-rulers',
      url_o_Componente: 'unidadmedicion'
    },
    {
      menu_ID: 12,
      menu_Descripcion: 'articulo',
      icono: 'bi bi-file-earmark-text',
      url_o_Componente: 'articulo'
    },
    {
      menu_ID: 13,
      menu_Descripcion: 'indicador',
      icono: 'bi bi-graph-up',
      url_o_Componente: 'indicador'
    },
    {
      menu_ID: 14,
      menu_Descripcion: 'literal',
      icono: 'bi bi-journal-text',
      url_o_Componente: 'literal'
    },
    {
      menu_ID: 15,
      menu_Descripcion: 'numeral',
      icono: 'bi bi-list-ol',
      url_o_Componente: 'numeral'
    },
    {
      menu_ID: 16,
      menu_Descripcion: 'paragrafo',
      icono: 'bi bi-card-text',
      url_o_Componente: 'paragrafo'
    },
    {
      menu_ID: 17,
      menu_Descripcion: 'resultadoindicador',
      icono: 'bi bi-check2-circle',
      url_o_Componente: 'resultadoindicador'
    },
    {
      menu_ID: 18,
      menu_Descripcion: 'variable',
      icono: 'bi bi-sliders',
      url_o_Componente: 'variable'
    },
    {
      menu_ID: 19,
      menu_Descripcion: 'variablesporindicador',
      icono: 'bi bi-diagram-3',
      url_o_Componente: 'variablesporindicador'
    },
    {
      menu_ID: 20,
      menu_Descripcion: 'rol_usuario',
      icono: 'bi bi-person-badge',
      url_o_Componente: 'rol_usuario'
    },
    {
      menu_ID: 21,
      menu_Descripcion: 'actor',
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
