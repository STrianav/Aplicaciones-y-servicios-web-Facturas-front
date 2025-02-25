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
    }
  ]

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  onMenuSelect(menu: any): void {
    this.router.navigate(['navegador/' + menu]);
  }
}
