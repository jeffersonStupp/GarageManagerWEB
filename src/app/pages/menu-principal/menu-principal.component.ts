import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {

  }
  ngOnInit(): void {
document.title="Garage Manager"
  }




}
