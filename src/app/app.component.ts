import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Facturas';
  constructor(private router: Router) {

  }
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (typeof document !== 'undefined') {
          const loader = document.getElementById('global-loader');
          if (loader) {
            loader.style.display = 'none';
          }
        }
      }
    });
  }


}
