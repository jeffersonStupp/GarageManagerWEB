import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css'],
})
export class BarraSuperiorComponent implements OnInit {
  public tipoPerfilAdmin: boolean = null;
  public nomeusuario;
  public saudacao;

  constructor(
    public router: Router,
    public autenticacaoService: AutenticacaoService
  ) {}

  public ngOnInit(): void {
    this.tipoPerfilAdmin = this.autenticacaoService.tipoPerfilAdmin();
    this.nomeusuario = this.autenticacaoService.obterNomeUsuario();

    const dataAtual = new Date();
    const horaAtual = dataAtual.getHours();

    if (horaAtual >= 6 && horaAtual <= 11) {
      this.saudacao = 'Bom dia';
    } else if (horaAtual >= 12 && horaAtual <= 17) {
      this.saudacao = 'Boa tarde';
    } else {
      this.saudacao = 'Boa noite';
    }
  }

  public logout(): void {
    this.autenticacaoService.deslogarERedirecionarParaLogin();
  }

  public editarPerfilUsuario(): void {
    const idUsuarioLogado = this.autenticacaoService.obterIdUsuario();
    this.router.navigate(['/usuario/listagem/']);
  }

}
