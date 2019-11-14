import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Serializable } from '../models/serializable';
import * as _ from 'lodash';
import { FirebaseObject } from '../models/firebase-object';

@Injectable({
    providedIn: 'root'
})
export class OmniFireService {
    constructor(private db: AngularFireDatabase) {}

    getFireList<T>(type: new (obj: { key: string; [key: string]: any }) => T): Observable<T[]> {
        // console.log(((<any>type) as FirebaseObject)._firebase_path);
        return this.db
            .list<[] | null>(((<any>type) as FirebaseObject)._firebase_path)
            .snapshotChanges()
            .pipe(map(changes => changes.filter(c => !!c).map(c => new type({ key: c.key, ...c.payload.val() }))));
    }

    getFireObject<T>(type: new (obj: { key: string; [key: string]: any }) => T, key: string): Observable<T> {
        return this.db
            .object<{} | null>(((<any>type) as FirebaseObject)._firebase_path + key)
            .snapshotChanges()
            .pipe(map(changes => (changes ? new type({ key: changes.key, ...changes.payload.val() }) : null)));
    }

    /**
     * Obtém as chaves dos filhos de caminho no banco de dados. Comumente usado para paths de relação 1-N.
     *
     * Ex: materias_perguntas: {id_materia: {pergunta1_id: true, pergunta2_id: true}}
     * Retorna, neste caso: ['pergunta1_id', 'pergunta2_id']
     * @param path caminho do banco
     * @param key chave para acesso
     */
    getFireListChildKey(path: string, key: string): Observable<string[]> {
        return this.db
            .object(path + key)
            .snapshotChanges()
            .pipe(map(changes => (changes && changes.payload.val() ? _.keys(changes.payload.val()) : [])));
    }

    insertFireObject(object: FirebaseObject): Promise<void | string> {
        // console.log(object._firebase_path + object.key, JSON.stringify(object.serialize(), null, 2));
        return new Promise((res, rej) => {
            if (object.key) {
                this.db
                    .object(object._firebase_path + object.key)
                    .update(object.serialize())
                    .then(() => res())
                    .catch(err => rej(err));
            } else {
                this.db
                    .list(object._firebase_path)
                    .push(object.serialize())
                    .then(ans => res(ans.key))
                    .catch(err => rej(err));
            }
        });
    }

    insertObjetao(objetao: {}): Promise<void> {
        return this.db.object('/').update(objetao);
    }

    removeFireObject(object: FirebaseObject): Promise<void> {
        return this.db.object(object._firebase_path + object.key).remove();
    }
}
