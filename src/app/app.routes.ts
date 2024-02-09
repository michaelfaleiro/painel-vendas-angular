import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OrcamentoComponent } from './pages/orcamento/orcamento.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'orcamentos', component: OrcamentoComponent, title: 'Orçamentos' },
];
