import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTableModule
} from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';

import { StatModule } from '../../shared/modules/stat/stat.module';
import { MinhasVotacoesRoutingModule } from './minhas-votacoes-routing.module';
import { MinhasVotacoesComponent } from './minhas-votacoes.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        MinhasVotacoesRoutingModule,
        MatGridListModule,
        StatModule,
        MatCardModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        FormsModule,
        MatSlideToggleModule,
        FlexLayoutModule.withConfig({addFlexToParent: false})
    ],
    declarations: [MinhasVotacoesComponent]
})
export class MinhasVotacoesModule {}
