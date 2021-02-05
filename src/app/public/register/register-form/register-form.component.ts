import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
	selector: 'al-register-form',
	templateUrl: './register-form.component.html',
	styles: []
})
export class RegisterFormComponent implements OnInit {

	registerForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private authService: AuthService) { }

	ngOnInit() {
		this.registerForm = this.fb.group({
			'name': ['', [
				Validators.required,
				Validators.minLength(4),
				Validators.maxLength(20),
				Validators.pattern('^[a-zA-Z0-9_-]*$')
			]],
			'email': ['', [
				Validators.required,
				Validators.email
			]],
			'password': ['', [
				Validators.required,
				Validators.minLength(4),
				Validators.maxLength(20)
			]]
		});
	}

	get name() { return this.registerForm.get('name') }
	get email() { return this.registerForm.get('email') }
	get password() { return this.registerForm.get('password') }

	submit() {


		this.authService
			.registerUser(this.name.value, this.email.value, this.password.value)
			.subscribe(
				success => this.submitACK(success),
				error => this.submitNACK(error)
			);

		
	}
	
	submitACK(userObject: any)
	{
		console.log("USER => " + userObject); 
		this.router.navigate(['/app/dashboard'])
	}
	
	submitNACK(errorObject: any)
	{
		console.log("ERROR => " + errorObject);
		this.registerForm.reset();
	}

}