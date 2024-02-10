import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { IOrcamento } from '../interface/IOrcamento';
import { IProduto } from '../interface/IProduto';

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

  getProdutoOrcamento(id: string, produtoId: string) {
    return this.http.get<IProduto>(`${this.apiUrl}/${id}/${produtoId}`);
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

  addProdutoOrcamento(id: string, produto: string) {
    return this.http.post<IProduto>(`${this.apiUrl}/${id}`, produto);
  }

  putProdutoOrcamento(id: string, produtoId: string, produto: IProduto) {
    return this.http.put<IProduto>(
      `${this.apiUrl}/${id}/${produtoId}`,
      produto
    );
  }

  removeProdutoOrcamento(id: string, produtoId: string) {
    return this.http.delete<IProduto>(`${this.apiUrl}/${id}/${produtoId}`);
  }
}
