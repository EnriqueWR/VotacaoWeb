import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MinhasVotacoesComponent } from './minhas-votacoes.component';

const routes: Routes = [
    {
        path: '',
        component: MinhasVotacoesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MinhasVotacoesRoutingModule {}
