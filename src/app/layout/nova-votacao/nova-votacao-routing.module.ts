import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NovaVotacaoComponent } from './nova-votacao.component';

const routes: Routes = [
  {
      path: '',
      component: NovaVotacaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NovaVotacaoRoutingModule { }
