import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialogModule,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule,MatDialogModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
  
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}
  
  cerrarDialogo() {
    this.dialogRef.close();
  }
}
