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
import { ConstantesBanco } from 'src/app/shared/constantes/constantes-banco';

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
    uploadingFlag: boolean;

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
            if (!votacao || !votacao.key) {
                this.route.navigate(['/dashboard/']);
                alert('Votação não encontrada.');
            }
            this.votacao = votacao;
            console.log('votacao', votacao);
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

        return ((votos / sum) * 100).toFixed(2) + '%';
    }

    votar(index: number) {
        const userUid = this.loggedUser.uid;
        const path = this.votacao._firebase_path + this.votacaoId;

        this.enviandoRespostaFlag = true;
        this.db.database.ref(path).transaction(function(currentValue) {
            const resp = (currentValue as VotacaoModel);

            if (!resp.abertaFlag) {
                alert('Votação encerrada!');
                return;
            }
            if (resp.listaUsuarios) {
                if (resp.listaUsuarios[userUid]) {
                    alert('Só é permitido um voto por pessoa.');
                    return;
                }
            }

            if (!resp.listaUsuarios) {
                resp.listaUsuarios = {};
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

    finalizarVotacao() {
        this.uploadingFlag = true;
        const objetao = {};
        const objetaoKey = this.votacaoId;

        this.votacao.abertaFlag = false;

        objetao[ConstantesBanco.PATH_VOTACOES + objetaoKey] = this.votacao.serialize();
        objetao[ConstantesBanco.PATH_VOTACOES_ABERTAS + objetaoKey] = null;

        this.omniService.insertObjetao(objetao).then(resp => {
            alert('Votação encerrada com sucesso!');
        }).catch(err => {
            console.error(err);
            alert('Erro ao encerrar votação.');
        }).finally(() => {
            this.uploadingFlag = false;
        });
    }

    deletarVotacao() {
        this.uploadingFlag = true;
        const objetao = {};
        const objetaoKey = this.votacaoId;

        objetao[ConstantesBanco.PATH_VOTACOES + objetaoKey] = null;
        objetao[ConstantesBanco.PATH_VOTACOES_ABERTAS + objetaoKey] = null;
        objetao[ConstantesBanco.PATH_VOTACOES_USERS + this.loggedUser.uid + '/' + objetaoKey] = null;

        this.omniService.insertObjetao(objetao).then(resp => {
            this.route.navigate(['/minhas-votacoes/']);
            alert('Votação deletada com sucesso!');
        }).catch(err => {
            console.error(err);
            alert('Erro ao deletar votação.');
        }).finally(() => {
            this.uploadingFlag = false;
        });
    }

}
