import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {AngularFireDatabase} from '@angular/fire/database';
import { OmniFireService } from 'src/app/shared/services/omni-fire.service';
import { VotacaoListModel } from 'src/app/shared/models/votacao-list-model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    displayedColumns: string[] = ['nome', 'userName', 'acao'];
    dataSource: MatTableDataSource<VotacaoListModel>;

    constructor(private omniService: OmniFireService, private route: Router) {}

    ngOnInit() {
        this.omniService.getFireList(VotacaoListModel).subscribe(dados => {
            this.dataSource = new MatTableDataSource(dados);
        });
    }

    irParaVotacao(id: string): void {
        this.route.navigate(['/visualizar-votacao/' + id]);
    }
}
