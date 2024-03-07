import { Component, OnInit } from '@angular/core';
import Cliente from 'src/app/models/cliente.model';
import { AlertService } from 'src/app/services/alert.service';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes-bloqueados',
  templateUrl: './clientes-bloqueados.component.html',
  styleUrls: ['./clientes-bloqueados.component.css']
})
export class ClientesBloqueadosComponentimplements implements OnInit{
  public listaClientes: Cliente[] = [];
  public tipoPerfilAdmin: boolean = null;
  constructor(
    public clienteservice: ClienteService,
    public alertService: AlertService,
    public autenticacaoService: AutenticacaoService
  ) {}
  public ngOnInit(): void {
    document.title = 'Clientes Pendentes';
    this.tipoPerfilAdmin = this.autenticacaoService.tipoPerfilAdmin();
    this.obterClientesApi();
  }
  public obterClientesApi() {
    this.clienteservice.obterTodosBloqueados().subscribe(
      (resposta) => {
        if (resposta != null) {
          this.listaClientes = resposta;
        } else {
          this.alertService.showToastrError('Erro na API');
        }
      },
      (exception) => {
        let mensagemErro =
          typeof exception?.error == 'string' ? exception?.error : '';
        this.alertService.showToastrError('Erro na requisição', mensagemErro);
      }
    );
  }
}
