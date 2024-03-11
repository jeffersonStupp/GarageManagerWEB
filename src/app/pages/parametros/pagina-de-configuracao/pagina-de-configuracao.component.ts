import { ConfiguracaoService } from './../../../services/configuracao.service';
import { AlertService } from '../../../services/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import configuracao from 'src/app/models/configuracao.model';

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
      idadeMaximaCadastro:[null , []]

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



}
