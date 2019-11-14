import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { OmniFireService } from 'src/app/shared/services/omni-fire.service';
import { VotacaoListModel } from 'src/app/shared/models/votacao-list-model';
import { VotacaoModel } from 'src/app/shared/models/votacao-model';
import { Router } from '@angular/router';
import { UsuarioLogadoService } from 'src/app/shared/services/usuario-logado.service';
import * as moment from 'moment';
import { User } from 'firebase';
import { ConstantesBanco } from 'src/app/shared/constantes/constantes-banco';
@Component({
  selector: 'app-nova-votacao',
  templateUrl: './nova-votacao.component.html',
  styleUrls: ['./nova-votacao.component.scss']
})
export class NovaVotacaoComponent implements OnInit {
    form: FormGroup;

    alternativas = [0, 1];
    contador = 2;
    readonly limiteAlternativas = 5;

    linkFlag = false;

    uploadingFlag = false;

    loggedUser: User = null;

    constructor(
        private formBuilder: FormBuilder,
        private omniService: OmniFireService,
        private route: Router,
        private usuarioLogadoService: UsuarioLogadoService) {
        this.form = this.formBuilder.group({
            nome: ['', Validators.required],
            corpo: [''],
            item0: ['', Validators.required],
            item1: ['', Validators.required],
        });
    }

    ngOnInit() {
        this.usuarioLogadoService.getLoggedUser().subscribe(user => {
            this.loggedUser = user;
        });
    }

    adicionarAlternativa(): void {
        if (this.alternativas.length >= this.limiteAlternativas) {
            alert('Você atingiu o limite de alternativas.');
            return;
        }

        this.form.addControl('item' + this.contador, new FormControl(''));
        this.alternativas.push(this.contador);
        this.contador++;
    }

    removerAlternativa(index: number): void {
        this.form.removeControl('item' + this.alternativas[index]);
        this.alternativas.splice(index, 1);
    }

    async cadastrarVotacao(): Promise<void> {
        if (this.form.invalid || this.alternativas.length < 2) {
            Object.keys(this.form.controls).forEach(campo => {
                this.form.get(campo).markAsTouched();
            });
            alert('Verifique os campos invalidos!');
            return;
        }

        if (!this.loggedUser) {
            alert('Dados do usuario não encontrado, verifique se a sessão expirou.');
            return;
        }

        this.uploadingFlag = true;

        const objetao = {};
        const objetaoKey = this.loggedUser.uid + moment().valueOf();

        const newVotacao = new VotacaoModel();
        newVotacao.nome = this.form.get('nome').value;
        newVotacao.corpo = this.form.get('corpo').value;
        newVotacao.abertaFlag = true;
        newVotacao.alternativas = this.alternativas.map(index => this.form.get('item' + index).value).filter(texto => !!texto);
        newVotacao.respostas = {};
        for (let i = 0; i < newVotacao.alternativas.length; i++) {
            newVotacao.respostas[i] = 0;
        }

        newVotacao.userName = this.loggedUser.displayName;
        newVotacao.userId = this.loggedUser.uid;

        const newVotacaoList = new VotacaoListModel();
        newVotacaoList.nome = this.form.get('nome').value;
        newVotacaoList.userName = this.loggedUser.displayName;

        objetao[newVotacao._firebase_path + objetaoKey] = newVotacao.serialize();
        objetao[newVotacaoList._firebase_path + objetaoKey] = newVotacaoList.serialize();
        objetao[ConstantesBanco.PATH_VOTACOES_USERS + this.loggedUser.uid + '/' + objetaoKey] = true;

        this.omniService.insertObjetao(objetao).then(resp => {
            this.route.navigate(['/minhas-votacoes/']);
            alert('Votação cadastrada com sucesso!');
        }).catch(err => {
            console.error(err);
            alert('Erro ao cadastrar votação.');
        }).finally(() => {
            this.uploadingFlag = false;
        });
    }

}
