import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { IOrcamento } from '../interface/IOrcamento';

@Injectable({
  providedIn: 'root',
})
export class OrcamentoService {
  private apiUrl = `${environment.api}/orcamentos`;

  constructor(private http: HttpClient) {}

  getAllOrcamentos(): Observable<IOrcamento[]> {
    return this.http.get<IOrcamento[]>(this.apiUrl);
  }

  getOrcamentoById(id: string): Observable<IOrcamento> {
    return this.http.get<IOrcamento>(`${this.apiUrl}/${id}`);
  }

  postOrcamento(orcamento: IOrcamento): Observable<IOrcamento> {
    return this.http.post<IOrcamento>(this.apiUrl, orcamento);
  }

  putOrcamento(id: string, orcamento: IOrcamento) {
    return this.http.put<IOrcamento>(`${this.apiUrl}/${id}`, orcamento);
  }

  removeOrcamento(id: string) {
    return this.http.delete<IOrcamento>(`${this.apiUrl}/${id}`);
  }
}
