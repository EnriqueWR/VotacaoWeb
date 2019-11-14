import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {AngularFireDatabase, AngularFireAction, DatabaseSnapshot} from '@angular/fire/database';
import { OmniFireService } from 'src/app/shared/services/omni-fire.service';
import { VotacaoListModel } from 'src/app/shared/models/votacao-list-model';
import { Router } from '@angular/router';
import { map, switchMap, take } from 'rxjs/operators';
import { VotacaoModel } from 'src/app/shared/models/votacao-model';
import { combineLatest, Subscriber, Observable } from 'rxjs';
import { ConstantesBanco } from 'src/app/shared/constantes/constantes-banco';

@Component({
    selector: 'app-minhas-votacoes',
    templateUrl: './minhas-votacoes.component.html',
    styleUrls: ['./minhas-votacoes.component.scss']
})
export class MinhasVotacoesComponent implements OnInit {
    displayedColumns: string[] = ['nome', 'userName', 'acao'];
    dataSource: MatTableDataSource<VotacaoListModel>;

    lista: string[];

    dadosCarregar: {
        [key: string]: VotacaoModel
    } = {};

    constructor(private db: AngularFireDatabase, private omniService: OmniFireService, private route: Router) {}

    ngOnInit() {
        this.omniService.getFireListChildKey('/votacoesUsers/', '123').pipe(take(1)).subscribe(resp => {
            console.log(resp);
            this.lista = resp;
        });
    }

    getDados(key: string, index: number) {
        if (this.dadosCarregar[index]) {
            return;
        }
        this.omniService.getFireObject(VotacaoModel, key).subscribe(resp => {
            console.log(resp);
            this.dadosCarregar[index] = resp;
            if (Object.keys(this.dadosCarregar || []).length === this.lista.length) {
                this.loadDados();
            }
        });
    }

    loadDados() {
        const dados = Object.values(this.dadosCarregar).map(vot => {
            const resp = new VotacaoListModel();
            resp.key = vot.key;
            resp.nome = vot.nome;
            resp.userName = vot.userName;
            return resp;
        });

        this.dataSource = new MatTableDataSource(dados);

    }


    irParaVotacao(id: string): void {
        this.route.navigate(['/visualizar-votacao/' + id]);
    }
}
