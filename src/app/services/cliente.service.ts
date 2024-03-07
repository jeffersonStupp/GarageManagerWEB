
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  Cliente  from 'src/app/models/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private urlbase = 'http://localhost:5201/cliente/';
  constructor(public httpClient: HttpClient) {}

  public adicionar(cliente: Cliente) {
    return this.httpClient.post<Cliente>(this.urlbase + 'adicionar', cliente);
  }
  public atualizar(cliente: Cliente) {
    return this.httpClient.put<Cliente>(this.urlbase + 'atualizar', cliente);
  }
  public excluir(id: number) {
    return this.httpClient.delete<any>(this.urlbase + 'excluir/' + id);
  }
  public obterPorId(id: number) {
    return this.httpClient.get<Cliente>(this.urlbase + 'obterporid/' + id);
  }
  public obterTodos() {
    return this.httpClient.get<Cliente[]>(this.urlbase + 'obter');
  }
  public obterTodosPendentes() {
    return this.httpClient.get<Cliente[]>(this.urlbase + 'obterPendentes');
  }
  public obterTodosBloqueados() {
    return this.httpClient.get<Cliente[]>(this.urlbase + 'obterBloqueados');
  }
  public buscarcep(cep: string) {
    return this.httpClient.get<any>(this.urlbase + 'buscacep/' + cep);
  }

  public excluirOBS(cliente:Cliente){
    return this.httpClient.put<Cliente>(this.urlbase + 'excluirObs', cliente);
  }
  public editOBS(cliente:Cliente) {
    return this.httpClient.put<Cliente>(this.urlbase + 'atualizarObs', cliente);
  }
  public homologarCliente(cliente:Cliente){
    return this.httpClient.put<Cliente>(this.urlbase + 'homologarCliente', cliente);
  }
  public bloquearCliente(cliente:Cliente){
    return this.httpClient.put<Cliente>(this.urlbase + 'bloquearCliente', cliente);
  }
}
