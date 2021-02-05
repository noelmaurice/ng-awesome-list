import { Component, OnInit } from '@angular/core';

import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'al-planning-workday-list',
  templateUrl: './planning-workday-list.component.html',
  styles: []
})
export class PlanningWorkdayListComponent implements OnInit {

  // $ => convention de nommage pour un Observable
  public workdays$: any;
  public workdays: any;
   
 ngOnInit() {
  this.workdays = [
   { dueDate: 'Lundi', doneTasks: 1, remainingTasks: 0 },
   { dueDate: 'Mardi', doneTasks: 0, remainingTasks: 2 },
   { dueDate: 'Mercredi', doneTasks: 0, remainingTasks: 1 }
  ];
  
  this.workdays$ = of(this.workdays).pipe(delay(1000)); 
 }
  
 // Ajoutez notre gestionnaire d’événement :
 onWorkdayRemoved(dueDate: string) {
  this.workdays = this.workdays.filter((workday: { dueDate: string; }) => 
   {
      return !dueDate.includes(workday.dueDate);
    }
  );
  this.workdays$ = of(this.workdays);
 }

}
