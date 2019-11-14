import { FirebaseObject, SetFirebasePath } from "./firebase-object";
import { ConstantesBanco } from "../constantes/constantes-banco";

@SetFirebasePath(ConstantesBanco.PATH_VOTACOES_ABERTAS)
export class VotacaoListModel extends FirebaseObject {
    nome: string;
    userName: string;

    constructor(obj?: {}) {
        super(obj);
    }
}
