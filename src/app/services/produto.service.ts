import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Produto from '../models/produto.model';
@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private urlBase = 'http://localhost:5201/';

  constructor(public httpClient: HttpClient) {}

  public adicionar(produto: Produto) {
    return this.httpClient.post<Produto>(
      this.urlBase + 'produto/adicionar',
      produto
    );
  }

  public atualizar(produto: Produto) {
    return this.httpClient.put<Produto>(
      this.urlBase + 'produto/atualizar',
      produto
    );
  }

  public obterPorId(id: number) {
    return this.httpClient.get<Produto>(
      this.urlBase + 'produto/obterPorId/' + id
    );
  }

  public obterTodosProdutos() {
    return this.httpClient.get<Produto[]>(this.urlBase + 'produto/obterTodos');
  }

  public excluir(id: number) {
    return this.httpClient.delete<any>(this.urlBase + 'produto/excluir/' + id);
  }
}
