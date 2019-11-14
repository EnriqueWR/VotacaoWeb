import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizarVotacaoComponent } from './visualizar-votacao.component';
import { VisualizarVotacaoRoutingModule } from './visualizar-votacao-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatStepperModule,
  MatIconModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatProgressBarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    VisualizarVotacaoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatIconModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
  declarations: [VisualizarVotacaoComponent],
})
export class VisualizarVotacaoModule { }
