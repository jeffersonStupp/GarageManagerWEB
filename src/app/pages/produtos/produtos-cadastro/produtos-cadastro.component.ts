import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Produto from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';
@Component({
  selector: 'app-produtos-cadastro',
  templateUrl: './produtos-cadastro.component.html',
  styleUrls: ['./produtos-cadastro.component.css'],
})
export class ProdutosCadastroComponent implements OnInit {
  public formulario: FormGroup;
  public formSubmetido: boolean = false;
  public id: number = null;

  constructor(
    public FormBuilder: FormBuilder,
    public router: Router,
    public activateRouter: ActivatedRoute,
    public produtoservice: ProdutoService,
    public alertService: AlertService
  ) {}
  public ngOnInit(): void {
    this.id = this.activateRouter.snapshot.params['id'];
    if (this.id == null) {
      document.title = 'cadastro';
    } else {
      document.title = 'edicão';
      this.chamarApiParaObterProdutoPorId(this.id);
    }
    this.inicializarConfigForm();
  }

  public submeterForm(): void {
    this.formSubmetido = true;

    if (this.formulario.invalid) {
      return;
    }
    let produto: Produto = new Produto(this.formulario.getRawValue());

    if (this.id == null) {
      this.chamarApiAdicionar(produto);
    } else {
      this.chamarApiAtualizar(produto);
    }
  }

  private inicializarConfigForm(): void {
    this.formulario = this.FormBuilder.group({
      id: [0],
      codigo: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      grupo: [null, [Validators.required]],
      tipo: [null, [Validators.required]],
      fabricante: [null],
      fornecedor: [null],
      preco: [null, [Validators.required]],
      garantia: [null],
    });
  }

  public chamarApiAdicionar(produto: Produto) {
    this.produtoservice.adicionar(produto).subscribe(
      (resposta) => {
        if (resposta != null) {
          this.alertService.showToastrSuccess('Produto Cadastrado');

          this.router.navigate(['/produto/listagem']);
        } else {
          this.alertService.showToastrError('erro ao cadastrar');
        }
      },
      (exception) => {
        let mensagemErro =
          typeof exception?.error == 'string' ? exception?.error : '';
        this.alertService.showToastrError('Erro na requisição', mensagemErro);
      }
    );
  }
  public chamarApiAtualizar(produto: Produto) {
    this.produtoservice.atualizar(produto).subscribe(
      (resposta) => {
        if (resposta != null) {
          this.alertService.showToastrSuccess('Cliente atualizado');
          this.router.navigate(['/produto/listagem']);
        } else {
          this.alertService.showToastrError('erro ao atualizar');
        }
      },
      (exception) => {
        let mensagemErro =
          typeof exception?.error == 'string' ? exception?.error : '';
        this.alertService.showToastrError('Erro na requisição', mensagemErro);
      }
    );
  }
  public chamarApiParaObterProdutoPorId(id: number): void {
    this.produtoservice.obterPorId(id).subscribe(
      (resposta) => {
        if (resposta != null) {
          this.formulario.patchValue(resposta);
        }
      },
      (exception) => {
        let mensagemErro =
          typeof exception?.error == 'string' ? exception?.error : '';
        this.alertService.showToastrError('Erro na requisição', mensagemErro);
      }
    );
  }
  public voltar() {
    if (this.id == null) {
      this.router.navigate(['']);
    } else {
      this.router.navigate(['/produto/listagem']);
    }
  }
}
