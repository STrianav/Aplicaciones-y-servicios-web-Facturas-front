import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
//Esta función interceptor se ejecuta cada vez que se hace una solicitud HTTP en la aplicación:
export const authInterceptor: HttpInterceptorFn = (
  // request => Es la solicitud HTTP que está a punto de enviarse. Es un objeto de tipo HttpRequest, 
  // el cual contiene todos los detalles de la solicitud (como la URL, los encabezados, el cuerpo, etc.).
  request: HttpRequest<unknown>,
  // next => Es la función que maneja el siguiente paso en la cadena de interceptores. Es responsable de enviar 
  // la solicitud HTTP modificada o sin modificaciones:
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Este bloque no intercepta las solicitudes que coincidan con ciertos patrones de URL, como /login, /auth y /obtenerRol:
  if (request.url.includes('/login') ||
    request.url.includes('/auth') ||
    request.url.includes('/obtenerRol')) {
    return next(request);
  } // => Esto se hace porque generalmente no se requiere un token de autenticación para las solicitudes de inicio de sesión 
  // Obtiene el token de autenticación del almacenamiento local del navegador.
  let token = localStorage.getItem('token'); 
  if (token) {
    // Se está clonando la solicitud (request) y creando una nueva instancia de HttpRequest (authReq).
    let authReq = request.clone({ // Si el token está presente, se clona la solicitud original.
      headers: request.headers.set('Authorization', `Bearer ${token}`) // Se le agrega un encabezado de Authorization
      // que es el esquema común para enviar tokens de autenticación en las cabeceras HTTP..
    });
    return next(authReq); // Pasa la solicitud clonada (authReq) directamente al manejador HTTP 
    // que realizará la solicitud al servidor.
  }
  return next(request); // Si no se encuentra un token en el almacenamiento local, 
  // simplemente pasa la solicitud tal como está, sin modificarla.
};