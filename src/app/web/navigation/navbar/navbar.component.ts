import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() toggleMenu = new EventEmitter<void>();
  private router = inject(Router);

  logout() {
    // this.General.clearLocalStorage();
    this.router.navigate(['login']);
  }

  AbrirMenu(){
    this.toggleMenu.emit();
  }

  abrirPerfil(){
    this.router.navigate(['cashin/perfil']);
  }
}
