import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioLogadoService {
    constructor(private angularFireAuth: AngularFireAuth) { }

    getLoggedUser(): Observable<User> {
        return this.angularFireAuth.user;
    }
}
