import { Routes } from "@angular/router";
import { AuthGuard } from "../../guards/auth.guard";

export default [
    {
        path: 'inicio',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./inicio/inicio.component').then((m) => m.InicioComponent)
    },
    {
        path: 'frecuencia',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./contenido/frecuencia/frecuencia.component').then((m) => m.FrecuenciaComponent)
    },
    {
        path: 'fuente',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./contenido/fuente/fuente.component').then((m) => m.FuenteComponent)
    },
    {
        path: 'represenvisual',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./contenido/represenvisual/represenvisual.component').then((m) => m.RepresenvisualComponent)
    },
    {
        path: 'tipoindicador',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./contenido/tipoindicador/tipoindicador.component').then((m) => m.TipoindicadorComponent)
    },
    {
        path: 'rol',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./contenido/rol/rol.component').then((m) => m.RolComponent)
    },
    {
        path: 'usuario',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./contenido/usuario/usuario.component').then((m) => m.UsuarioComponent)
    },
    {
        path: 'seccion',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./contenido/seccion/seccion.component').then((m) => m.SeccionComponent)
    },
    {
        path: 'sentido',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./contenido/sentido/sentido.component').then((m) => m.SentidoComponent)
    },
    {
        path: 'subseccion',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./contenido/subseccion/subseccion.component').then((m) => m.SubseccionComponent)
    },
    {
        path: 'tipoactor',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./contenido/tipoactor/tipoactor.component').then((m) => m.TipoactorComponent)
    },
    {
        path: 'unidadmedicion',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./contenido/unidadmedicion/unidadmedicion.component').then((m) => m.UnidadmedicionComponent)
    },
    {
        path: 'articulo',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./contenido/articulo/articulo.component').then((m) => m.ArticuloComponent)
    },
    {
        path: 'actor',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./contenido/actor/actor.component').then((m) => m.ActorComponent)
    },
    {
        path: 'indicador',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./contenido/indicador/indicador.component').then((m) => m.IndicadorComponent)
    },
    {
        path: 'literal',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./contenido/literal/literal.component').then((m) => m.LiteralComponent)
    },
    {
        path: 'numeral',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./contenido/numeral/numeral.component').then((m) => m.NumeralComponent)
    },
    {
        path: 'paragrafo',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./contenido/paragrafo/paragrafo.component').then((m) => m.ParagrafoComponent)
    },
    {
        path: 'resultadoindicador',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./contenido/resultadoindicador/resultadoindicador.component').then((m) => m.ResultadoindicadorComponent)
    },
    {
        path: 'variable',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./contenido/variable/variable.component').then((m) => m.VariableComponent)
    },
    {
        path: 'variablesporindicador',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./contenido/variablesporindicador/variablesporindicador.component').then((m) => m.VariablesporindicadorComponent)
    },
    {
        path: 'rol_usuario',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./contenido/rol-usuario/rol-usuario.component').then((m) => m.RolUsuarioComponent)
    }

] as Routes