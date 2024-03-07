import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPrincipalComponent } from './pages/menu-principal/menu-principal.component';
import { BarraSuperiorComponent } from './components/barra-superior/barra-superior.component';
import { CadastroComponent } from './pages/clientes/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuarioListagemComponent } from './pages/usuario/usuario-listagem/usuario-listagem.component';
import { UsuarioCadastroComponent } from './pages/usuario/usuario-cadastro/usuario-cadastro.component';
import { UsuarioLogadoGuard } from './guards/usuario-logado.guards';
import { ClienteListagemComponent } from './pages/clientes/cliente-listagem/cliente-listagem.component';
import { AutenticacaoService } from './services/autenticacao.service';
import { ViewClienteComponent } from './pages/clientes/view-cliente/view-cliente.component';
import { NovaObsComponent } from './pages/clientes/nova-obs/nova-obs.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientesPendentesComponent } from './pages/clientes/clientes-pendentes/clientes-pendentes.component';
import { ClientesPendentesViewComponent } from './pages/clientes/clientes-pendentes-view/clientes-pendentes-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/principal', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: '',
    canActivate: [UsuarioLogadoGuard],
    component: BarraSuperiorComponent,
    children: [
      { path: 'principal', component: MenuPrincipalComponent },
      {
        path: 'usuario',
        children: [
          { path: 'listagem', component: UsuarioListagemComponent },
          { path: 'cadastro', component: UsuarioCadastroComponent },
          { path: 'cadastro/:id', component: UsuarioCadastroComponent },
          { path: 'dashboard', component: DashboardComponent },
          ],
      },
      {
        path: 'cliente',
        children: [
          { path: 'listagem', component: ClienteListagemComponent },
          { path: 'cadastro', component: CadastroComponent },
          { path: 'cadastro/:id', component: CadastroComponent },
          { path: 'viewcliente/:id', component: ViewClienteComponent },
          { path: 'clienteOBS/:id', component: NovaObsComponent },
          { path: 'pendentes', component: ClientesPendentesComponent },
          {path: 'pendentesView/:id',component: ClientesPendentesViewComponent,},

        ],
      },
    ],
  },

  { path: '**', redirectTo: '/principal', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
