import { Task } from './task';
  
export class Workday {
 readonly id: string; // identifiant de la journée de travail
 dueDate: string; // date à laquelle est prévue la journée de travail
 notes?: string; // facultatif : notes éventuelles prises par l’utilisateur
 tasks: Task[]; // la liste des tâches à faire
 userId: string; // identifiant de l’utilisateur
 
 constructor(options: {
  id?: string,
  dueDate?: string,
  notes?: string,
  tasks?: Task[],
  userId: string  
 }){
  this.id = options.id || null;
  this.dueDate = options.dueDate || 'Lundi';
  this.notes = options.notes || '';
  this.tasks = [new Task()];
  this.userId = options.userId;
 }
}