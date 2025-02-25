import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/inicio',
        pathMatch: 'full'
    },
    {
        path: 'inicio',
        loadComponent: () => 
            import('./web/home-page/home-page.component').then((m) => m.HomePageComponent)
    },
    {
        path: 'login',
        loadComponent: () => 
            import('./web/authenticator/auth/auth.component').then((m) => m.AuthComponent)
    },
    {
        path: 'registrar',
        loadComponent: () => 
            import('./web/authenticator/register/register.component').then((m) => m.RegisterComponent)
    },
    {
        path: 'navegador',
        loadChildren: () => 
            import('./web/navigation/navigation.routes').then((m) => m.default),
        loadComponent: () => 
            import('./web/navigation/navigation.component').then((m) => m.NavigationComponent)
    },
    {
        path: '**',
        redirectTo: '/inicio',
        pathMatch: 'full'
    }
];
