import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { ModuloGeneralModule } from '../../shared/modulo-general.module';

@Component({
  selector: 'app-navigation',
  imports: [MenuComponent, NavbarComponent, RouterOutlet, ModuloGeneralModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  menuOpen = false;
  
  toggleMenu(){
    this.menuOpen = !this.menuOpen;
  }

}
