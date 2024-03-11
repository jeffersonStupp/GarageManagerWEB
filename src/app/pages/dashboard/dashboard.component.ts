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
public contagemDePendentes:number = 0;
public textoContadorPendentes:string = "";
public mostrarContadorPendentes:boolean = false;

public listaClientesBloqueados: Cliente[]=[];
public contagemDeBloqueados:number=0;
public textoContadorBloqueados:string = "";
public mostrarContadorBloqueados:boolean = false;


  public ngOnInit(): void {
    document.title = 'Dashboard';

    this.id = this.activateRouter.snapshot.params['id'];
    this.obterClientesPendentes();
    this.obterClientesBloqueados();







  }
  constructor(
    public activateRouter: ActivatedRoute,
    public clienteservice: ClienteService,
    public alertService: AlertService,
    public router: Router,

    public autenticacaoService: AutenticacaoService

    ) {}

    public obterClientesPendentes() {
      this.clienteservice.obterTodosPendentes().subscribe(
        (resposta) => {
          if (resposta != null) {
            this.listaClientesPendentes = resposta;
            this.contagemDePendentes=this.listaClientesPendentes.length

            if(this.contagemDePendentes <= 0){
              this.textoContadorPendentes = " Nenhum cliente requer aprovação";}
              this.mostrarContadorPendentes = false

              if(this.contagemDePendentes>1){
                this.textoContadorPendentes=" novos clientes cadastrados com autorizações pendentes para homologação. Ação necessária do administrador para aprovação.";
                this.mostrarContadorPendentes = true
              }
              if(this.contagemDePendentes == 1){
                this.textoContadorPendentes=" novo cliente cadastrado com autorização pendente para homologação. Ação necessária do administrador para aprovação."
                this.mostrarContadorPendentes = true
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









  public obterClientesBloqueados() {
    this.clienteservice.obterTodosBloqueados().subscribe(
      (resposta) => {
        if (resposta != null) {
          this.listaClientesBloqueados = resposta;
          this.contagemDeBloqueados=this.listaClientesBloqueados.length

          if(this.contagemDeBloqueados <= 0){
            this.textoContadorBloqueados = " Nenhum cliente bloqueado";}
            this.mostrarContadorBloqueados = false

            if(this.contagemDeBloqueados>1){
              this.textoContadorBloqueados=" clientes cadastrados estão com seus cadastros bloqueados";
              this.mostrarContadorBloqueados = true
            }
            if(this.contagemDeBloqueados == 1){
              this.textoContadorBloqueados=" cliente cadastrado está com seu cadasto bloqueado"
              this.mostrarContadorBloqueados = true
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
