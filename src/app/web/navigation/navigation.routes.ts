import { Routes } from "@angular/router";

export default [
    {
        path: 'inicio',
        loadComponent: () =>
            import('./inicio/inicio.component').then((m) => m.InicioComponent)
    },
    {
        path: 'frecuencia',
        loadComponent: () =>
            import('./contenido/frecuencia/frecuencia.component').then((m) => m.FrecuenciaComponent)
    },
    {
        path: 'fuente',
        loadComponent: () =>
            import('./contenido/fuente/fuente.component').then((m) => m.FuenteComponent)
    },
    {
        path: 'represenvisual',
        loadComponent: () =>
            import('./contenido/represenvisual/represenvisual.component').then((m) => m.RepresenvisualComponent)
    },
    {
        path: 'tipoindicador',
        loadComponent: () =>
            import('./contenido/tipoindicador/tipoindicador.component').then((m) => m.TipoindicadorComponent)
    },
    {
        path: 'rol',
        loadComponent: () =>
            import('./contenido/rol/rol.component').then((m) => m.RolComponent)
    },
    {
        path: 'usuario',
        loadComponent: () =>
            import('./contenido/usuario/usuario.component').then((m) => m.UsuarioComponent)
    },
    {
        path: 'seccion',
        loadComponent: () =>
            import('./contenido/seccion/seccion.component').then((m) => m.SeccionComponent)
    },
    {
        path: 'sentido',
        loadComponent: () =>
            import('./contenido/sentido/sentido.component').then((m) => m.SentidoComponent)
    },
    {
        path: 'subseccion',
        loadComponent: () =>
            import('./contenido/subseccion/subseccion.component').then((m) => m.SubseccionComponent)
    },
    {
        path: 'tipoactor',
        loadComponent: () =>
            import('./contenido/tipoactor/tipoactor.component').then((m) => m.TipoactorComponent)
    },
    {
        path: 'unidadmedicion',
        loadComponent: () =>
            import('./contenido/unidadmedicion/unidadmedicion.component').then((m) => m.UnidadmedicionComponent)
    },
    {
        path: 'articulo',
        loadComponent: () =>
            import('./contenido/articulo/articulo.component').then((m) => m.ArticuloComponent)
    },
    {
        path: 'actor',
        loadComponent: () =>
            import('./contenido/actor/actor.component').then((m) => m.ActorComponent)
    },
    {
        path: 'indicador',
        loadComponent: () =>
            import('./contenido/indicador/indicador.component').then((m) => m.IndicadorComponent)
    },
    {
        path: 'literal',
        loadComponent: () =>
            import('./contenido/literal/literal.component').then((m) => m.LiteralComponent)
    },
    {
        path: 'numeral',
        loadComponent: () =>
            import('./contenido/numeral/numeral.component').then((m) => m.NumeralComponent)
    },
    {
        path: 'paragrafo',
        loadComponent: () =>
            import('./contenido/paragrafo/paragrafo.component').then((m) => m.ParagrafoComponent)
    },
    {
        path: 'resultadoindicador',
        loadComponent: () =>
            import('./contenido/resultadoindicador/resultadoindicador.component').then((m) => m.ResultadoindicadorComponent)
    },
    {
        path: 'variable',
        loadComponent: () =>
            import('./contenido/variable/variable.component').then((m) => m.VariableComponent)
    },
    {
        path: 'variablesporindicador',
        loadComponent: () =>
            import('./contenido/variablesporindicador/variablesporindicador.component').then((m) => m.VariablesporindicadorComponent)
    },
    {
        path: 'rol_usuario',
        loadComponent: () =>
            import('./contenido/rol-usuario/rol-usuario.component').then((m) => m.RolUsuarioComponent)
    }
    
] as Routes