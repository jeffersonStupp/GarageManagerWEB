import { Porcentagem } from './../../../pipes/porcentagem.pipe';
import { ConfiguracaoService } from './../../../services/configuracao.service';
import { AlertService } from '../../../services/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import configuracao from 'src/app/models/configuracao.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagina-de-configuracao',
  templateUrl: './pagina-de-configuracao.component.html',
  styleUrls: ['./pagina-de-configuracao.component.css']
})
export class PaginaDeConfiguracaoComponent implements OnInit {
  public formulario: FormGroup;
  public formSubmetido: boolean = false;
  public id: number = 1



  constructor(
    public FormBuilder: FormBuilder,
    public router: Router,
    public activateRouter: ActivatedRoute,
public configuracaoService: ConfiguracaoService,
    public alertService: AlertService
  ) {}

  public ngOnInit():void{
    this.id = this.activateRouter.snapshot.params['id'];
    document.title = 'Configuração';
    this.chamarApiParaObterParametrosPorId(this.id);
    this.inicializarConfigForm();
  }

  public submeterForm(): void {
    this.formSubmetido = true;

let config:configuracao = new configuracao(this.formulario.getRawValue());

this.chamarApiAtualizar(config)



  }


  private inicializarConfigForm(): void {
    this.formulario = this.FormBuilder.group({
      id: [1],
      homologacaoDireta:[null],
      idadeMinimaCadastro:[null ,[]],
      idadeMaximaCadastro:[null , []],
      descontoPagamentoVista:[null],
      margemPecas:[null,[]],
      maoDeObra:[null , []],
      taxaDeJuros:[null,[]],
      LocalArquivoContratoDeServico:[null,[]],
      nomeOficina:[null,[]],
      numeroOficina:[null,[]],
      ruaOficina:[null,[]],
      bairroOficina:[null,[]],
      cidadeOficina:[null,[]],
      cepOficina:[null,[]],
      estadoOficina:[null,[]],
      cnpjOficina:[null,[]],
      telefoneOficina:[null,[]],

























    });
  }

  public chamarApiParaObterParametrosPorId(id: number): void {
    this.configuracaoService.obter().subscribe(
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
public chamarApiAtualizar(config: configuracao) {
  this.configuracaoService.alterar(config).subscribe(
    (resposta) => {
      if (resposta != null) {
        this.alertService.showToastrSuccess('Configuração atualizada');
        this.router.navigate(['/usuario/dashboard']);
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
public aoAlterarCep(): void {
  let cep: string = this.formulario.controls['cepOficina'].value;

  if (cep.length == 8) {
    this.chamarbuscacep(cep);
  }
}

public chamarbuscacep(cep: string): void {
  this.configuracaoService.buscarcep(cep).subscribe((resposta) => {
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
