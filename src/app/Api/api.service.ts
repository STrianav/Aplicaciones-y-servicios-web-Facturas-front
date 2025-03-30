import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly api = '';
  private readonly apiLocal = 'https://localhost:7043/api/p/';

  constructor(private http: HttpClient) { }

  TraerTabla(Tabla: string): Observable<any> {
    return this.http.get(`${this.apiLocal}${Tabla}`);
  }

  CrearData(Tabla: string, data: any): Observable<any> {
    return this.http.post(`${this.apiLocal}${Tabla}`, data)
  }

  EditarData(Tabla: string, where: string, valor: string, data: any): Observable<any> {
    return this.http.put(`${this.apiLocal}${Tabla}/${where}/${valor}`, data)
  }

  EliminarData(Tabla: string, where: string, valor: string): Observable<any> {
    return this.http.delete(`${this.apiLocal}${Tabla}/${where}/${valor}`)
  }
}
