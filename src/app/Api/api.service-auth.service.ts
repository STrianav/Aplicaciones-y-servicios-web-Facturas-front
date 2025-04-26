import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceAuthService {
  private readonly apiLocal = 'https://localhost:7043/api/Auth';

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiLocal}/login`, data);
  }

  obtenerRol(email: string): Observable<any> {
    return this.http.get(`${this.apiLocal}/obtener-rol`, {
      params: { email }
    });
  }
}
