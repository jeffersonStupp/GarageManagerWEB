import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import Cliente from 'src/app/models/cliente.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-nova-obs',
  templateUrl: './nova-obs.component.html',
  styleUrls: ['./nova-obs.component.css']
})
export class NovaObsComponent implements OnInit{

  public formulario: FormGroup;
  public formSubmetido: boolean = false;
  public id: number = null;
  public cliente: Cliente;
  public obs: string ='';

  public ngOnInit(): void {
    document.title = 'observação';
    this.id = this.activateRouter.snapshot.params['id'];
    this.obterCliente();
    this.iniciarForm();

  }
  constructor(
    public activateRouter: ActivatedRoute,
    public clienteservice: ClienteService,
    public alertService: AlertService,
    public router: Router,
    public formBuilder: FormBuilder,
  ) {}

  public obterCliente() {
    this.clienteservice.obterPorId(this.id).subscribe(
      (resposta) => {
        if (resposta != null) {
          this.cliente = resposta;

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
private iniciarForm():void{
  this.formulario = this.formBuilder.group({
    obstxt:[this.obs]
  })
}




public submeterForm(): void {
  this.formSubmetido = true;


  this.obs = this.formulario.get('obstxt').value;

  if (!this.obs) {
    this.alertService.showToastrError('O campo de observação é obrigatório.');
    return;
  }


  this.cliente.obs = this.obs
  this.clienteservice.editOBS(this.cliente).subscribe(
    (resposta) => {
      this.alertService.showToastrSuccess('Observação inserida');
      this.router.navigate(['/cliente/viewcliente', this.cliente.id]);





    },
    (exception) => {

      let mensagemErro = typeof exception?.error == 'string' ? exception?.error : '';
      this.alertService.showToastrError('Erro na requisição', mensagemErro);
    }
  );
}















}
























