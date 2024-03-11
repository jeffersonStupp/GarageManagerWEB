import Cliente from 'src/app/models/cliente.model';

import { BotaoExcluirComponent } from './components/botoes/botao-excluir/botao-excluir.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  HttpClientJsonpModule,
  HttpClientModule,
} from '@angular/common/http';
import { MenuPrincipalComponent } from './pages/menu-principal/menu-principal.component';

import { BarraSuperiorComponent } from './components/barra-superior/barra-superior.component';
import { ClienteListagemComponent } from './pages/clientes/cliente-listagem/cliente-listagem.component';
import { CadastroComponent } from './pages/clientes/cadastro/cadastro.component';
import { ValidatorComponent } from './components/validator/validator.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';
import { CpfPipe } from './pipes/cpf.pipe';
import { TelefonePipe } from './pipes/telefone.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { LoginComponent } from './pages/login/login.component';
import { UsuarioListagemComponent } from './pages/usuario/usuario-listagem/usuario-listagem.component';
import { UsuarioCadastroComponent } from './pages/usuario/usuario-cadastro/usuario-cadastro.component';
import { UsuarioLogadoGuard } from './guards/usuario-logado.guards';
import { AuthInterceptor } from './interceptors/requisicao.interceptor';
import { MoneyFormatPipe } from './pipes/money-format.pipe';
import { DateTimeFormatPipe } from './pipes/date-time-format.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BotaoClienteViewComponent } from './components/botoes/botao-cliente-view/botao-cliente-view.component';
import { BotaoEditarComponent } from './components/botoes/botao-editar/botao-editar.component';
import { ViewClienteComponent } from './pages/clientes/view-cliente/view-cliente.component';
import { TelefoneFixoPipe } from './pipes/telefone-fixo.pipe';
import { NovaObsComponent } from './pages/clientes/nova-obs/nova-obs.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientesPendentesComponent } from './pages/clientes/clientes-pendentes/clientes-pendentes.component';
import { ClientesPendentesViewComponent } from './pages/clientes/clientes-pendentes-view/clientes-pendentes-view.component';
import { BotaoAdicionarComponent } from './components/botoes/botao-adicionar/botao-adicionar.component';
import { ClientesBloqueadosViewComponent } from './pages/clientes/clientes-bloqueados-view/clientes-bloqueados-view.component';
import { ClientesBloqueadosComponent } from './pages/clientes/clientes-bloqueados/clientes-bloqueados.component';
import { PaginaDeConfiguracaoComponent } from './pages/parametros/pagina-de-configuracao/pagina-de-configuracao.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuPrincipalComponent,
    BarraSuperiorComponent,
    ClienteListagemComponent,
    CadastroComponent,
    ValidatorComponent,
    CpfPipe,
    TelefonePipe,
    DateFormatPipe,
    LoginComponent,
    UsuarioListagemComponent,
    UsuarioCadastroComponent,
    DateTimeFormatPipe,
    ViewClienteComponent,
    MoneyFormatPipe,
    BotaoClienteViewComponent,
    BotaoEditarComponent,
    BotaoExcluirComponent,
    TelefoneFixoPipe,
    NovaObsComponent,
    DashboardComponent,
    ClientesPendentesComponent,
    ClientesPendentesViewComponent,
    BotaoAdicionarComponent,
    ClientesBloqueadosComponent,
    ClientesBloqueadosViewComponent,
    PaginaDeConfiguracaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [
    UsuarioLogadoGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
