import { Routes } from '@angular/router';
import { CotizadorComponent } from './cotizador/cotizador.component';
import { RegistroComponent } from './registro/registro.component';

export const routes: Routes = [
    {path: '', redirectTo: 'cotizador', pathMatch: 'full'},
    {path: 'cotizador', component: CotizadorComponent},
    {path: 'registro', component: RegistroComponent},
    {path: '**', redirectTo:'cotizador'}
];
