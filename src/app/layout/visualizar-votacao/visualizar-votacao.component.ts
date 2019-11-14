import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { OmniFireService } from 'src/app/shared/services/omni-fire.service';
import { VotacaoListModel } from 'src/app/shared/models/votacao-list-model';
import { VotacaoModel } from 'src/app/shared/models/votacao-model';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioLogadoService } from 'src/app/shared/services/usuario-logado.service';
import * as moment from 'moment';
import { User } from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import * as _ from 'lodash';

@Component({
  selector: 'app-visualizar-votacao',
  templateUrl: './visualizar-votacao.component.html',
  styleUrls: ['./visualizar-votacao.component.scss']
})
export class VisualizarVotacaoComponent implements OnInit {
    loggedUser: User = null;
    votacaoId: string;
    votacao: VotacaoModel;
    enviandoRespostaFlag: boolean;

    constructor(
            private formBuilder: FormBuilder,
            private omniService: OmniFireService,
            private route: Router,
            private activeRouter: ActivatedRoute,
            private usuarioLogadoService: UsuarioLogadoService,
            private db: AngularFireDatabase
        ) {
        this.votacaoId = this.activeRouter.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.usuarioLogadoService.getLoggedUser().subscribe(user => {
            this.loggedUser = user;
        });

        this.omniService.getFireObject(VotacaoModel, this.votacaoId).subscribe(votacao => {
            this.votacao = votacao;
        });
    }

    jaVotou(): boolean {
        return this.votacao.listaUsuarios ? !!this.votacao.listaUsuarios[this.loggedUser.uid] : false;
    }

    porcentagem(votos: number) {
        let sum = 0;
        for (const value of Object.values(this.votacao.respostas)) {
            sum += value;
        }

        if (sum <= 0) {
            return 'Sem votos';
        }

        return ((votos / sum) * 100).toFixed(2);
    }

    votar(index: number) {
        const userUid = this.loggedUser.uid;
        const path = this.votacao._firebase_path + this.votacaoId;

        this.enviandoRespostaFlag = true;
        this.db.database.ref(path).transaction(function(currentValue) {
            if (currentValue['listaUsuarios']) {
                if (currentValue['listaUsuarios'][userUid]) {
                    alert('Já votou');
                    return;
                }
            }
            const resp = (currentValue as VotacaoModel);
            if (!resp['listaUsuarios']) {
                resp['listaUsuarios'] = {};
            }
            resp.listaUsuarios[userUid] = true;
            resp.respostas[index]++;
            return resp; // (currentValue || 0) + 1;
        }).then(resp => {
            // console.log('Mensagem enviada', resp);
        }).catch(err => {
            console.error(err);
        }).finally(() => {
            this.enviandoRespostaFlag = false;
        });
    }

}
