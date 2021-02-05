import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { catchError, tap, finalize } from 'rxjs/operators';
import { ErrorService } from './error.service';

import { LoaderService } from 'src/app/core/services/loader.service';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { ToastrService } from './toastr.service';


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private user: BehaviorSubject<User | null> = new BehaviorSubject(null);
	public readonly user$: Observable<User | null> = this.user.asObservable();


	constructor(
		private http: HttpClient,
		private errorService: ErrorService,
		private loaderService: LoaderService,
		private router: Router,
		private usersService: UsersService,
		private toastrService: ToastrService) { }

	public login(email: string, password: string): Observable<User | null> {

		this.loaderService.setLoading(true);

		const data = {
			email: email,
			password: password
		};
		const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};

		return this.http.post<User>(environment.server.wsServerURL + '/user/auth', data, httpOptions).pipe(
			// l'utilisateur du service est renseigné'
			tap(user => this.user.next(user)),
			tap(user => this.saveAuthData(user)),
			// gestion des erreurs éventuelles
			catchError(error => this.errorService.handleError(error, "Login impossible")),
			finalize(() => this.loaderService.setLoading(false))
		);
	}

	public autoLogin(user: any) {
		this.user.next(user);
		this.login(user.email, user.password)
			.subscribe(
				_ => this.router.navigate(['/app/dashboard']),
				_ => this.router.navigate(['/home'])
			);
	}

	public logout(): void {
		localStorage.removeItem('emailUser');
		localStorage.removeItem('passwordUser');

		this.user.next(null);
		this.router.navigate(['/login']);
	}

	public registerUser(name: string, email: string, password: string): Observable<User | null> {

		this.loaderService.setLoading(true);

		const data = {
			name: name,
			email: email,
			password: password,
		};

		const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};

		return this.http.put<User>(environment.server.wsServerURL + '/user', data, httpOptions).pipe(
			// l'utilisateur du service est renseigné'
			tap(user => this.user.next(user)),
			tap(user => this.saveAuthData(user)),
			// gestion des erreurs éventuelles
			catchError(error => this.errorService.handleError(error, "Enregistrement impossible")),
			finalize(() => this.loaderService.setLoading(false))
		);
	}

	private saveAuthData(user: User) {
		localStorage.setItem('emailUser', user.email);
		localStorage.setItem('passwordUser', user.password);
	}

	public updateUserState(user: User): Observable<User | null> {
		this.loaderService.setLoading(true);
		return this.usersService.update(user).pipe(
			tap(user => this.saveAuthData(user)),
			tap( _ => this.toastrService.showToastr(
				{
					category: 'success',
					message: 'Compte utilisateur modifié'
				})),
			// gestion des erreurs éventuelles
			catchError(error => this.errorService.handleError(error, "Modification impossible")),
			finalize(() => this.loaderService.setLoading(false))
		);
	}

	get currentUser(): User {
		return this.user.getValue();
	}
}