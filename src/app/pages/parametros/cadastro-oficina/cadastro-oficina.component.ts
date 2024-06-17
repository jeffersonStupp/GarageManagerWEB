import { ConfiguracaoService } from './../../../services/configuracao.service';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Configuracao from 'src/app/models/configuracao.model';

@Component({
  selector: 'app-cadastro-oficina',
  templateUrl: './cadastro-oficina.component.html',
  styleUrls: ['./cadastro-oficina.component.css'],
})
export class CadastroOficinaComponent implements OnInit {
  public formulario: FormGroup;
  public formSubmetido: boolean = false;
  public id: number = null;

  constructor(
    public FormBuilder: FormBuilder,
    public router: Router,
    public activateRouter: ActivatedRoute,
    public configuracaoservice: ConfiguracaoService,
    public alertService: AlertService
  ) {}

  public ngOnInit(): void {
    // this.id = this.activateRouter.snapshot.params['id'];

    this.chamarApiParaObterConfiguracoes();

    this.inicializarConfigForm();
  }

  public submeterForm(): void {
    this.formSubmetido = true;

    //let jsonTexto = JSON.stringify(this.formulario.getRawValue());
    //alert(jsonTexto);

    // if (this.formulario.invalid) {
      //      return;
      //    }

      let configuracao: Configuracao = new Configuracao(
        this.formulario.getRawValue()
      );
      this.chamarApiAtualizar(configuracao)
      //this.chamarApiParaObterConfiguracoes();

    //let jsonTexto = JSON.stringify(this.formulario.getRawValue());
    //alert(jsonTexto);
  }

  private inicializarConfigForm(): void {
    this.formulario = this.FormBuilder.group({
      id: [0],
      nomeOficina: [
        null,
        [
          Validators.required,
          Validators.maxLength(200),
          Validators.minLength(3),
        ],
      ],
            cnpjOficina: [null, [Validators.required, Validators.maxLength(14)]],

      emailOficina: [
        null,
        [Validators.email, Validators.required, Validators.maxLength(200)],
      ],

      telefoneOficina: [null, [Validators.maxLength(30)]],
      ruaOficina: [null, [Validators.required]],
      numeroOficina: [null, [Validators.maxLength(10)]],
      cepOficina: [null],
      bairroOficina: [null, [Validators.required]],
      cidadeOficina: [null, [Validators.required]],
      estadoOficina: ['Escolha um estado', [Validators.required]],
      situacao: ['normal'],
    });
  }

  public chamarApiAtualizar(configuracao: Configuracao) {
    this.configuracaoservice.alterar(configuracao).subscribe(
      (resposta) => {
        if (resposta != null) {

          this.alertService.showToastrSuccess('Oficina atualizada');
          this.router.navigate(['/usuario/configuracao']);
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
  public chamarApiParaObterConfiguracoes(): void {
    this.configuracaoservice.obter().subscribe(
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

  public aoAlterarCep(): void {
    let cep: string = this.formulario.controls['cepOficina'].value;

    if (cep.length == 8) {
      this.chamarbuscacep(cep);
    }
  }

  public chamarbuscacep(cep: string): void {
    this.configuracaoservice.buscarcep(cep).subscribe((resposta) => {
      this.formulario.patchValue(resposta);

      //alert(JSON.stringify(resposta));

      this.formulario.controls['ruaOficina'].setValue(resposta.enderecoLogradouro);
      this.formulario.controls['bairroOficina'].setValue(resposta.bairro);
      this.formulario.controls['cidadeOficina'].setValue(resposta.localidade);
      this.formulario.controls['bairroOficina'].setValue(resposta.bairro);
      this.formulario.controls['estadoOficina'].setValue(resposta.uf);
    });
  }
}
