import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { CotizadorComponent } from './cotizador/cotizador.component';
import { RegistroComponent } from './registro/registro.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    CotizadorComponent,
    RegistroComponent,
    HeaderComponent,
    FooterComponent,
    ConfirmDialogComponent,
    SuccessDialogComponent,
    MatDialogModule
  ]
})
export class AppComponent {
  title = 'cotizador-siroe';
  constructor(private dialog: MatDialog) {}
}
