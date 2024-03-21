import { ProdutoService } from './../../../services/produto.service';
import { Component, OnInit } from '@angular/core';
import Produto from 'src/app/models/produto.model';
import { AlertService } from 'src/app/services/alert.service';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-produtos-listagem',
  templateUrl: './produtos-listagem.component.html',
  styleUrls: ['./produtos-listagem.component.css']
})
export class ProdutosListagemComponent  implements OnInit {

  public listaProdutos: Produto[] = [];
  public tipoPerfilAdmin: boolean = null;
  constructor(
    public produtoService: ProdutoService,
    public alertService: AlertService,
    public autenticacaoService: AutenticacaoService,
    public router: Router,
    ) {}

    public ngOnInit(): void {
      document.title = 'Lista de Produtos';
      this.tipoPerfilAdmin = this.autenticacaoService.tipoPerfilAdmin();
      this.obterProdutosApi();
  }
  public obterProdutosApi() {
    this.produtoService.obterTodosProdutos().subscribe(
      (resposta) => {
        if (resposta != null) {

         this.listaProdutos=resposta
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
    this.produtoService.excluir(id).subscribe(
      (resposta) => {
        this.alertService.showToastrSuccess('O produto foi excluido');
        this.obterProdutosApi();
      },
      (exception) => {
        let mensagemErro =
          typeof exception?.error == 'string' ? exception?.error : '';
        this.alertService.showToastrError('Erro na requisição', mensagemErro);
      }
    );
  }
}
