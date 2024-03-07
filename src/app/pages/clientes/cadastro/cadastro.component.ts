import { AlertService } from '../../../services/alert.service';
import { ClienteService } from '../../../services/cliente.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Cliente from 'src/app/models/cliente.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  public formulario: FormGroup;
  public formSubmetido: boolean = false;
  public id: number = null;

  constructor(
    public FormBuilder: FormBuilder,
    public router: Router,
    public activateRouter: ActivatedRoute,
    public clienteservice: ClienteService,
    public alertService: AlertService
  ) {}

  public ngOnInit(): void {
    this.id = this.activateRouter.snapshot.params['id'];

    if (this.id == null) {
      document.title = 'cadastro';
    } else {
      document.title = 'edicão';
      this.chamarApiParaObterClientePorId(this.id);
    }
    this.inicializarConfigForm();
  }

  public submeterForm(): void {
    this.formSubmetido = true;

    //let jsonTexto = JSON.stringify(this.formulario.getRawValue());
    //alert(jsonTexto);



    if (this.formulario.invalid) {
      return;
    }

    let cliente: Cliente = new Cliente(this.formulario.getRawValue());

    if (this.id == null) {
      this.chamarApiAdicionar(cliente);
    } else {
      this.chamarApiAtualizar(cliente);
    }

     //let jsonTexto = JSON.stringify(this.formulario.getRawValue());
     //alert(jsonTexto);
  }

  private inicializarConfigForm(): void {
    this.formulario = this.FormBuilder.group({
      id: [0],
      nome: [
        null,
        [
          Validators.required,
          Validators.maxLength(200),
          Validators.minLength(3),
        ],
      ],
      dataNascimento: [null, [Validators.required]],
      cpf: [null, [Validators.required, Validators.maxLength(14)]],

      email: [
        null,
        [Validators.email, Validators.required, Validators.maxLength(200)],
      ],
      celular: [null, [Validators.maxLength(30)]],
      telefone: [null, [Validators.maxLength(30)]],
      rua: [null, [Validators.required]],
      numero: [null,[Validators.maxLength(10)]],
      cep: [null],
      bairro: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      estado: ['Escolha um estado', [Validators.required]],
      situacao: ['normal'],
    });
  }
  public chamarApiAdicionar(cliente: Cliente) {
    this.clienteservice.adicionar(cliente).subscribe(
      (resposta) => {
        if (resposta != null) {
          this.alertService.showToastrSuccess('Cliente Cadastrado');

          this.router.navigate(['/cliente/listagem']);
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
  public chamarApiAtualizar(cliente: Cliente) {
    this.clienteservice.atualizar(cliente).subscribe(
      (resposta) => {
        if (resposta != null) {
          this.alertService.showToastrSuccess('Cliente atualizado');
          this.router.navigate(['/cliente/listagem']);
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
  public chamarApiParaObterClientePorId(id: number): void {
    this.clienteservice.obterPorId(id).subscribe(
        (resposta) => {
            if (resposta != null) {
                this.formulario.patchValue(resposta);
                this.formulario.get('dataNascimento').patchValue(new Date(resposta.dataNascimento).toISOString().split('T')[0]);
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
    let cep: string = this.formulario.controls['cep'].value;

    if (cep.length == 8) {
      this.chamarbuscacep(cep);
    }
  }

  public chamarbuscacep(cep: string): void {
    this.clienteservice.buscarcep(cep).subscribe((resposta) => {
      this.formulario.patchValue(resposta);

      //alert(JSON.stringify(resposta));

      this.formulario.controls['rua'].setValue(resposta.enderecoLogradouro);
      this.formulario.controls['bairro'].setValue(resposta.bairro);
      this.formulario.controls['cidade'].setValue(resposta.localidade);
      this.formulario.controls['bairro'].setValue(resposta.bairro);
      this.formulario.controls['estado'].setValue(resposta.uf);
    });
  }
}
