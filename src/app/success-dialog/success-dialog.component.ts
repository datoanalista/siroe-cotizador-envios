import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-success-dialog',
  standalone: true,
  imports: [CommonModule,MatDialogModule],
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.scss'
})
export class SuccessDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SuccessDialogComponent>   
  ) {}

  cerrarDialogo() {
    this.dialogRef.close();
  }

  descargarPDF() {
    const pdf = new jsPDF();

    pdf.setFontSize(16);
    pdf.text('Cotización Ingresada', 10, 10);
    pdf.setFontSize(12);
    pdf.text(`Nombre Artículo: ${this.data.cotizacion.nombreArticulo}`, 10, 20);
    pdf.text(`Descripción: ${this.data.cotizacion.descripcion}`, 10, 30);
    pdf.text(`Volumen: ${this.data.cotizacion.volumen} cm³ (${(this.data.cotizacion.volumen / 1000000).toFixed(2)} m³)`, 10, 40);
    pdf.text(`Precio: ${this.data.cotizacion.precio} CLP`, 10, 50);
    pdf.text(`Pedido ID: ${this.data.cotizacion.pedidoId}`, 10, 60);
    pdf.text(`Fecha: ${this.data.cotizacion.fechaIngreso}`, 10, 70);
    pdf.text(`Hora: ${this.data.cotizacion.horaIngreso}`, 10, 80);
    pdf.text(`____________________________`,10,90);
    pdf.text(`www.siroe.cl`,10,110);
    pdf.save('cotizacion-siroe.pdf');
    this.dialogRef.close();
  }
}
