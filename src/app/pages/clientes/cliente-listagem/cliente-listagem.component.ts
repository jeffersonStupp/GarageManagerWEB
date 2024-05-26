import { ClienteService } from '../../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import Cliente from 'src/app/models/cliente.model';
import { AlertService } from 'src/app/services/alert.service';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cliente-listagem',
  templateUrl: './cliente-listagem.component.html',
  styleUrls: ['./cliente-listagem.component.css'],
})
export class ClienteListagemComponent implements OnInit {
  public listaClientes: Cliente[] = [];
  public termoBusca: string = '';
  public tipoDeBusca: string = 'Todos';

  public tipoPerfilAdmin: boolean = null;
  constructor(
    public clienteservice: ClienteService,
    public alertService: AlertService,
    public autenticacaoService: AutenticacaoService
  ) {}

  public ngOnInit(): void {
    document.title = 'Lista de Clientes';
    this.tipoPerfilAdmin = this.autenticacaoService.tipoPerfilAdmin();
    this.obterClientesApi();


  }
  public obterClientesApi() {
    this.clienteservice.obterTodos().subscribe(
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
  public confirmarExcluir(id: number) {
    this.alertService.alertConfirm({
      title: 'Atenção',
      text: 'Você deseja realmente excluir o registro?',
      confirmButtonText: 'Sim',
      confirmButtonColor: 'green',
      showCancelButton: true,
      cancelButtonText: 'Não',
      cancelButtonColor: 'red',
      fn: () => {
        this.chamarApiParaExcluir(id);
      },
      fnCancel: () => {
        this.alertService.showToastrInfo('Operação cancelada!');
      },
    });
  }

  private chamarApiParaExcluir(id: number) {
    this.clienteservice.excluir(id).subscribe(
      (resposta) => {
        this.alertService.showToastrWarning('O cliente foi excluido');
        this.obterClientesApi();
      },
      (exception) => {
        let mensagemErro =
          typeof exception?.error == 'string' ? exception?.error : '';
        this.alertService.showToastrError('Erro na requisição', mensagemErro);
      }
    );
  }
  public aplicarFiltro(termo: string): void {
    this.termoBusca = termo.toLowerCase();
  }
  public selecionarTipoDeBusca(tipo: string): void {
    this.tipoDeBusca = tipo;
  }

  get listaFiltrada(): Cliente[] {
    return this.listaClientes.filter((cliente: Cliente) => {
        // Verifica se o termo de busca está presente no código, na descrição, no fabricante ou no fornecedor do produto
        if (this.tipoDeBusca === "Nome") {
            return cliente.nome.toLowerCase().includes(this.termoBusca);
        }
        if (this.tipoDeBusca === "CPF") {
            return cliente.cpf.toLowerCase().includes(this.termoBusca);
        }
        if (this.tipoDeBusca === "E-mail") {
            return cliente.email.toLowerCase().includes(this.termoBusca);
        }
        if (this.tipoDeBusca === "Todos") {
            return (
                cliente.nome.toLowerCase().includes(this.termoBusca) ||
                cliente.cpf.toLowerCase().includes(this.termoBusca) ||
                cliente.email.toLowerCase().includes(this.termoBusca)
            );
        }
        // Caso nenhum dos filtros específicos seja selecionado, retorna verdadeiro para incluir todos os clientes
        return true;
    });
}
}






































// import { ClienteService } from '../../../services/cliente.service';
// import { Component, OnInit } from '@angular/core';
// import Cliente from 'src/app/models/cliente.model';
// import { AlertService } from 'src/app/services/alert.service';
// import { AutenticacaoService } from 'src/app/services/autenticacao.service';

// import { NgIf } from '@angular/common';

// @Component({
//   selector: 'app-cliente-listagem',
//   templateUrl: './cliente-listagem.component.html',
//   styleUrls: ['./cliente-listagem.component.css'],
// })
// export class ClienteListagemComponent implements OnInit {
//   public listaClientes: Cliente[] = [];
//   public tipoPerfilAdmin: boolean = null;
//   constructor(
//     public clienteservice: ClienteService,
//     public alertService: AlertService,
//     public autenticacaoService: AutenticacaoService
//   ) {}

//   public ngOnInit(): void {
//     document.title = 'Lista de Clientes';
//     this.tipoPerfilAdmin = this.autenticacaoService.tipoPerfilAdmin();
//     this.obterClientesApi();
//   }
//   public obterClientesApi() {
//     this.clienteservice.obterTodos().subscribe(
//       (resposta) => {
//         if (resposta != null) {
//           this.listaClientes = resposta;
//         } else {
//           this.alertService.showToastrError('Erro na API');
//         }
//       },
//       (exception) => {
//         let mensagemErro =
//           typeof exception?.error == 'string' ? exception?.error : '';
//         this.alertService.showToastrError('Erro na requisição', mensagemErro);
//       }
//     );
//   }
//   public confirmarExcluir(id: number) {
//     this.alertService.alertConfirm({
//       title: 'Atenção',
//       text: 'Você deseja realmente excluir o registro?',
//       confirmButtonText: 'Sim',
//       confirmButtonColor: 'green',
//       showCancelButton: true,
//       cancelButtonText: 'Não',
//       cancelButtonColor: 'red',
//       fn: () => {
//         this.chamarApiParaExcluir(id);
//       },
//       fnCancel: () => {
//         this.alertService.showToastrInfo('Operação cancelada!');
//       },
//     });
//   }

//   private chamarApiParaExcluir(id: number) {
//     this.clienteservice.excluir(id).subscribe(
//       (resposta) => {
//         this.alertService.showToastrSuccess('O cliente foi excluido');
//         this.obterClientesApi();
//       },
//       (exception) => {
//         let mensagemErro =
//           typeof exception?.error == 'string' ? exception?.error : '';
//         this.alertService.showToastrError('Erro na requisição', mensagemErro);
//       }
//     );
//   }
// }
