import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LayoutComponent} from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
               path: '',
               redirectTo: 'dashboard',
               pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
            },
            {
                path: 'nova-votacao',
                loadChildren: () => import('./nova-votacao/nova-votacao.module').then(m => m.NovaVotacaoModule)
            },
            {
                path: 'visualizar-votacao',
                loadChildren: () => import('./visualizar-votacao/visualizar-votacao.module').then(m => m.VisualizarVotacaoModule)
            },
            {
                path: 'minhas-votacoes',
                loadChildren: () => import('./minhas-votacoes/minhas-votacoes.module').then(m => m.MinhasVotacoesModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {
}
