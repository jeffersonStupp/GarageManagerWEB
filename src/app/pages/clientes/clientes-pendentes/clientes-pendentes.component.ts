import { Component, OnInit } from '@angular/core';
import Cliente from 'src/app/models/cliente.model';
import { AlertService } from 'src/app/services/alert.service';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-clientes-pendentes',
  templateUrl: './clientes-pendentes.component.html',
  styleUrls: ['./clientes-pendentes.component.css']
})
export class ClientesPendentesComponent implements OnInit{
  public listaClientes: Cliente[] = [];
  public tipoPerfilAdmin: boolean = null;
  constructor(
    public clienteservice: ClienteService,
    public alertService: AlertService,
    public autenticacaoService: AutenticacaoService,
    public router: Router,
    private cdr: ChangeDetectorRef,
  ) {}
  public ngOnInit(): void {
    document.title = 'Clientes Pendentes';
    this.tipoPerfilAdmin = this.autenticacaoService.tipoPerfilAdmin();
    this.obterClientesApi();
  }
  public obterClientesApi() {
    this.clienteservice.obterTodosPendentes().subscribe(
      (resposta) => {
        if (resposta != null) {
          this.listaClientes = resposta;

          if(this.listaClientes.length<1){

            this.router.navigate(['usuario/dashboard']);

            this.cdr.detectChanges();

          }

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
