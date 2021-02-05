import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UsersService {
	

	constructor(
		private http: HttpClient,
		private errorService: ErrorService) { }


	public update(user: User): Observable<User | null> {

		const data = {
			name: user.name,
			email: user.email,
			password: user.password,
			pomodoroDuration: user.pomodoroDuration,
			avatar: user.avatar

		};

		const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};

		return this.http.post<User>(environment.server.wsServerURL + '/user', data, httpOptions).pipe(
			// l'utilisateur du service est renseigné'
			tap( _ => console.log('Modification utilisateur effectuée')),
			// gestion des erreurs éventuelles
			catchError(error => this.errorService.handleError(error, "Enregistrement impossible"))
		);
	}

}