import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Indicador } from '../models/Indicador';

@Injectable({
  providedIn: 'root'
})
export class IndicadorService {
  private apiUrl = 'http://localhost:8080/indicadores';

  constructor(private http: HttpClient) { }

  getAllIndicadores(): Observable<Indicador[]> {
    return this.http.get<Indicador[]>(this.apiUrl);
  }

  getIndicadorById(id: number): Observable<Indicador> {
    return this.http.get<Indicador>(`${this.apiUrl}/${id}`);
  }

  updateIndicador(indicador: Indicador): Observable<Indicador> {
    return this.http.put<Indicador>(`${this.apiUrl}/${indicador.id}`, indicador);
  }

  saveIndicador(indicador: Indicador): Observable<Indicador> {
    return this.http.post<Indicador>(this.apiUrl, indicador);
  }


  deleteIndicador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
