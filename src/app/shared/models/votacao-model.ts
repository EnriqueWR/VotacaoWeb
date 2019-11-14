import { FirebaseObject, SetFirebasePath } from "./firebase-object";
import { ConstantesBanco } from "../constantes/constantes-banco";

@SetFirebasePath(ConstantesBanco.PATH_VOTACOES)
export class VotacaoModel extends FirebaseObject {
    nome: string;
    userName: string;
    userId: string;
    corpo: string;
    alternativas: string[];
    respostas: {
        [index: number]: number;
    };
    listaUsuarios: {
        [userId: string]: boolean;
    };
    abertaFlag: boolean;

    constructor(obj?: {}) {
        super(obj);
    }
}
