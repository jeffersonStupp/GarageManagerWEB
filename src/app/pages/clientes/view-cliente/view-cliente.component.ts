import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import Cliente from 'src/app/models/cliente.model';
import { AlertService } from 'src/app/services/alert.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

import { NgIf } from '@angular/common';



@Component({
  selector: 'app-view-cliente',
  templateUrl: './view-cliente.component.html',
  styleUrls: ['./view-cliente.component.css']
})
export class ViewClienteComponent implements OnInit {
  public id: number = null;
  public cliente: Cliente;
  public tipoPerfilAdmin: boolean = null;

  public existeOBS:boolean = null;
  public ngOnInit(): void {
    document.title = 'Detalhes do cliente';
    this.tipoPerfilAdmin = this.autenticacaoService.tipoPerfilAdmin();

    this.id = this.activateRouter.snapshot.params['id'];
    this.obterCliente();

  }
  constructor(
    public activateRouter: ActivatedRoute,
    public clienteservice: ClienteService,
    public alertService: AlertService,
    public router: Router,
    private cdr: ChangeDetectorRef,
    public autenticacaoService: AutenticacaoService

  ) {}
  public obterCliente() {
    this.clienteservice.obterPorId(this.id).subscribe(
      (resposta) => {
        if (resposta != null) {
          this.cliente = resposta;
          if(this.cliente.obs == null){
            this.existeOBS = false
          }else{
            this.existeOBS = true
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



    private chamarApiParaExcluirOBS(id: number) {
      this.clienteservice.excluirOBS(this.cliente).subscribe(
        (resposta) => {

          window.location.reload();
          this.router.navigate(['/cliente/viewcliente', this.cliente.id]);


          this.cdr.detectChanges();
          this.alertService.showToastrSuccess('A observação foi excluida');
        },
        (exception) => {
          let mensagemErro =
            typeof exception?.error == 'string' ? exception?.error : '';
          this.alertService.showToastrError('Erro na requisição', mensagemErro);
        }
      );






}
public confirmarExcluirOBS(id: number) {
  this.alertService.alertConfirm({
    title: 'Atenção',
    text: 'Você deseja realmente excluir a observação?',
    confirmButtonText: 'Sim',
    confirmButtonColor: 'green',
    showCancelButton: true,
    cancelButtonText: 'Não',
    cancelButtonColor: 'red',
    fn: () => {
      this.chamarApiParaExcluirOBS(this.cliente.id);
    },
    fnCancel: () => {
      this.alertService.showToastrInfo('Operação cancelada!');
    },
  });
}
}
