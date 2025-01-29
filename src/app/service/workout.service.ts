import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Workout {
  type: string;
  minutes: number;
}

export interface PeriodicElement {
  id: number;
  name: string;
  workouts: Workout[];
}

const initialData: PeriodicElement[] = [
  {
    id: 1,
    name: 'John Doe',
    workouts: [
      { type: 'Running', minutes: 30 },
      { type: 'Cycling', minutes: 45 }
    ]
  },
  {
    id: 2,
    name: 'Jane Smith',
    workouts: [
      { type: 'Swimming', minutes: 60 },
      { type: 'Running', minutes: 20 }
    ]
  },
  {
    id: 3,
    name: 'Mike Johnson',
    workouts: [
      { type: 'Yoga', minutes: 50 },
      { type: 'Cycling', minutes: 40 }
    ]
  },
];

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  //behavior subject to emit the workout data when changes occur
  private workoutDataSubject = new BehaviorSubject<PeriodicElement[]>(initialData);
  workoutData$ = this.workoutDataSubject.asObservable();

  constructor() {
    this.setInitialData(initialData);
    this.loadInitialData();
    }

  //add workout to the grid table  
  addWorkout(newWorkout: PeriodicElement): void {
    const currentData = this.workoutDataSubject.getValue();
    this.workoutDataSubject.next([...currentData, newWorkout]);

    localStorage.setItem('newWorkout', JSON.stringify([...currentData, newWorkout]));
  }

  setInitialData(data: PeriodicElement[]): void {
    this.workoutDataSubject.next(data);
  }

  //get data from local storage
  private loadInitialData(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedData = JSON.parse(localStorage.getItem('newWorkout') || '[]');
      if (savedData.length) {
        this.workoutDataSubject.next(savedData);
      }
    }
  }
}
