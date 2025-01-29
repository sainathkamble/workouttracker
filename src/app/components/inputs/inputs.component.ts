import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { WorkoutService, PeriodicElement } from '../../service/workout.service';

@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css']
})
export class InputsComponent {
  id: number = 0;
  name: string = '';
  workoutType: string = '';
  duration: number | null = null;

  constructor(private workoutService: WorkoutService) {}

  saveData(): void {
    if (!this.name || !this.workoutType || this.duration === null) {
      console.error('All fields are required.');
      return;
    }

    // Create a new workout object with provided data and increment the id
    const newWorkout: PeriodicElement = {
      id: ++this.id,
      name: this.name,
      workouts: [{ type: this.workoutType, minutes: this.duration }]
    };
    
    // Save the new workout to localStorage and the service
    this.saveToLocalStorage('newWorkout', newWorkout);

    this.workoutService.addWorkout(newWorkout);

    this.name = '';
    this.workoutType = '';
    this.duration = null;
  }

  private saveToLocalStorage(key: string, data: any): void {
    try {
      //get existing data from localStorage
      const existingData = JSON.parse(localStorage.getItem(key) || '[]');

      // Combine existing and new data
      const updatedData = [...existingData, data];

      // Save updated data back to localStorage
      localStorage.setItem(key, JSON.stringify(updatedData));
      console.log(`Saved data to localStorage with key: ${key}`);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
}


