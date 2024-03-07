import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public tipoPerfilAdmin: boolean = null;

constructor(
  public autenticacaoService: AutenticacaoService
){}



  ngOnInit(): void {
    this.tipoPerfilAdmin = this.autenticacaoService.tipoPerfilAdmin();
    document.title = 'Central Park';
  }
}
