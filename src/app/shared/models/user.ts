export class User {
	hasRole(arg0: string): any {
		throw new Error("Method not implemented.");
	}
    readonly id: string; // id de l’utilisateur
    name: string; // nom de l’utilisateur
    email: string; // email de l’utilisateur
    password: string; // mot de passe de l'utilisateur
    avatar: string; // url vers la photo de profil de l’utilisateur
    pomodoroDuration: number; // durée des pomodoros
     
    constructor(options: {
     id?: string,
     name?: string,
     email?: string,
     password?: string,
     avatar?: string,
     pomodoroDuration?: number,
    } = {}) {
     this.id = options.id || null;
     this.name= options.name || '';
     this.email = options.email || '';
	 this.password = options.password || '';
     this.avatar = options.avatar || '';
     this.pomodoroDuration = options.pomodoroDuration || 1500;
    }
    
    get roles(): string[] {
     return this.email.endsWith('admin.fr') ? ['USER', 'EMPLOYEE'] : ['USER'];
    }
   }
