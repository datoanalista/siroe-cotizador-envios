import { Component, ViewChild, ElementRef } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-cotizador',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cotizador.component.html',
  styleUrl: './cotizador.component.scss'
})
export class CotizadorComponent {
  nombreArticulo: string = '';
  descripcion: string = '';
  largo: number = 0;
  ancho: number = 0;
  alto: number = 0;
  precio: number = 0;
  volumen: number = 0;
  pedidoId: string = '';
  fechaIngreso: string = '';
  horaIngreso: string = '';

  @ViewChild('nombreInput') nombreInput!: ElementRef;

  constructor(private dialog: MatDialog) {}

  calcularPrecio() {
    this.volumen = this.largo * this.ancho * this.alto;
    this.precio = (this.volumen / 20) * 2000;

    if (this.volumen > 2000000) {
      this.abrirDialogoAdvertencia();
    }
  }

  seleccionarTexto(event: FocusEvent) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.select();  
  }

  abrirDialogoAdvertencia() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { mensaje: 'Para envíos iguales o mayores a 2m³, debe contactarse con un ejecutivo.' }
    });

    dialogRef.afterClosed().subscribe(
      () => {
        this.reiniciarValores(); 
      }
    );
  }

  reiniciarValores() {
    this.ancho = 0;
    this.largo = 0;
    this.alto = 0;
    setTimeout(() => {
      this.nombreInput.nativeElement.focus();
    });
  }

  abrirDialogoExito(cotizacion: any) {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      data: { cotizacion }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.limpiarDatos();
    });
  }
  enviarCotizacion() {
    if (!this.nombreArticulo || !this.descripcion || this.largo==0 || this.alto==0 || this.ancho==0) {
      this.dialog.open(ConfirmDialogComponent, {
        data: { mensaje: 'Los campos Nombre y Descripción son obligatorios. Además, ninguna dimensión debe ser 0.' }
      });
      return;
    }

    const volumen = this.largo * this.ancho * this.alto;

    if (volumen <= 2000000) {
      const now = new Date();
      this.pedidoId = this.generarIdPedido();
      this.fechaIngreso = now.toLocaleDateString();
      this.horaIngreso = now.toLocaleTimeString();

      // Guardar en Local Storage
      const cotizacion = {
        nombreArticulo: this.nombreArticulo,
        descripcion: this.descripcion,
        volumen,
        precio: this.precio,
        pedidoId: this.pedidoId,
        fechaIngreso: this.fechaIngreso,
        horaIngreso: this.horaIngreso,
      };
      const cotizaciones = JSON.parse(localStorage.getItem('cotizaciones') || '[]');
      cotizaciones.push(cotizacion);
      localStorage.setItem('cotizaciones', JSON.stringify(cotizaciones));

      this.abrirDialogoExito(cotizacion);
    }
  }

  limpiarDatos() {
    this.nombreArticulo = '';
    this.descripcion = '';
    this.largo = 0;
    this.ancho = 0;
    this.alto = 0;
    this.precio = 0;
    this.volumen = 0;

    setTimeout(() => {
      this.nombreInput.nativeElement.focus();
    });
  }

  private generarIdPedido(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
