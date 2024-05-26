import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import configuracao from '../models/configuracao.model';


@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoService {
  private urlbase = 'http://localhost:5201/parametros/';
  constructor(public httpClient: HttpClient) {}


  public obter(){
    return this.httpClient.get<configuracao>(this.urlbase + 'obter');
  }

  public alterar(configuracao:configuracao){
    return this.httpClient.put<configuracao>(this.urlbase + 'alterar', configuracao);
  }
  public buscarcep(cep: string) {
    return this.httpClient.get<any>(this.urlbase + 'buscacep/' + cep);
  }

}
