import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  cotizaciones: any[] = [];

  constructor() {
    if (typeof localStorage !== 'undefined'){
      this.cotizaciones = JSON.parse(localStorage.getItem('cotizaciones') || '[]');
    }
  }

  eliminarRegistro(pedidoId: string) {
    this.cotizaciones = this.cotizaciones.filter(c => c.pedidoId !== pedidoId);
    localStorage.setItem('cotizaciones', JSON.stringify(this.cotizaciones));
  }


}
