import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'al-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    
  title = 'awesome-list';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
        this.tryAutoLogin();
    }

  private tryAutoLogin() 
  {
  	const email = localStorage.getItem('emailUser');
  	if (!email) { return; }

	const password = localStorage.getItem('passwordUser');
  	if (!password) { return; }
 
	const data = {
		email: email,
		password: password
	}
	
	this.authService.autoLogin(data);
	
/*
  // On connecte l’utilisateur avec les informations de connexions stockées.
  const userId = localStorage.getItem('userId');
  this.usersService.get(userId, token).subscribe(user => {
   this.authService.autoLogin(user);
  });
*/
 }
}
