import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import Cliente from 'src/app/models/cliente.model';
import { AlertService } from 'src/app/services/alert.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-clientes-bloqueados-view',
  templateUrl: './clientes-bloqueados-view.component.html',
  styleUrls: ['./clientes-bloqueados-view.component.css']
})
export class ClientesBloqueadosViewComponent implements OnInit {
  public id: number = null;
  public cliente: Cliente;
  public clientebloqueado:boolean=null;
  


  public ngOnInit(): void {
    document.title = 'Detalhes do cliente';


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
          if(this.cliente.situacao == "Bloqueado"){
            this.clientebloqueado = true
          }else{
            this.clientebloqueado = false
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

  public chamarApiParaDesbloquear(id: number) {
    this.clienteservice.homologarCliente(this.cliente).subscribe(
      (resposta) => {

        window.location.reload();




        this.router.navigate(['/cliente/bloqueadosView', this.cliente.id]);


        this.cdr.detectChanges();
        this.alertService.showToastrSuccess('Cliente homologado');
      },
      (exception) => {
        let mensagemErro =
          typeof exception?.error == 'string' ? exception?.error : '';
        this.alertService.showToastrError('Erro na requisição', mensagemErro);
      }
    );
    }
    public chamarApiParaBloquear(id: number) {
      this.clienteservice.bloquearCliente(this.cliente).subscribe(
        (resposta) => {

          window.location.reload();
          this.router.navigate(['/cliente/bloqueadosView', this.cliente.id]);


          this.cdr.detectChanges();
          this.alertService.showToastrSuccess('Cliente homologado');
        },
        (exception) => {
          let mensagemErro =
            typeof exception?.error == 'string' ? exception?.error : '';
          this.alertService.showToastrError('Erro na requisição', mensagemErro);
        }
      );
    }

}
