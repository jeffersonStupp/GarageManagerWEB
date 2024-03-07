import { Component, OnInit } from '@angular/core';
import Cliente from 'src/app/models/cliente.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { ChangeDetectorRef } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public id: number = null;
  public cliente: Cliente;
  public listaClientesPendentes: Cliente[] = [];
public contagemDePendentes:number = 0
public textoContador:string = "";
public mostrarContador:boolean = false;

  public ngOnInit(): void {
    document.title = 'Dashboard';

    this.id = this.activateRouter.snapshot.params['id'];
    this.obterClientesApi();







  }
  constructor(
    public activateRouter: ActivatedRoute,
    public clienteservice: ClienteService,
    public alertService: AlertService,
    public router: Router,
    private cdr: ChangeDetectorRef,
    public autenticacaoService: AutenticacaoService

    ) {}

    public obterClientesApi() {
      this.clienteservice.obterTodosPendentes().subscribe(
        (resposta) => {
          if (resposta != null) {
            this.listaClientesPendentes = resposta;
            this.contagemDePendentes=this.listaClientesPendentes.length



            if(this.contagemDePendentes <= 0){
              this.textoContador = " Nenhum cliente requer aprovação";}
              this.mostrarContador = false

              if(this.contagemDePendentes>1){
                this.textoContador=" novos clientes cadastrados com autorizações pendentes para homologação. Ação necessária do administrador para aprovação.";
                this.mostrarContador = true
              }
              if(this.contagemDePendentes == 1){
                this.textoContador=" novo cliente cadastrado com autorização pendente para homologação. Ação necessária do administrador para aprovação."
                this.mostrarContador = true
              }
          }




       else {
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
