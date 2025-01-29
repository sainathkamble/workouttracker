import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { WorkoutService, PeriodicElement, Workout } from '../../service/workout.service';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [  
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'workouts'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private workoutService: WorkoutService) {
  }

  ngOnInit() {
    this.loadDataFromLocalStorage();

    this.workoutService.workoutData$.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //filter by name
  applyNameFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //filter by workout type
  applyWorkoutFilter(workoutType: string) {
    if (workoutType === '') {
      this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
        return data.name.toLowerCase().includes(filter);
      };
    } else {
      this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
        const workoutMatch = data.workouts.some(workout => workout.type.toLowerCase() === workoutType.toLowerCase());
        return workoutMatch && data.name.toLowerCase().includes(filter);
      };
    }
    this.dataSource.filter = '';
  }

  //save data to grid table
  formatWorkouts(workouts: Workout[]): string {
    return workouts.map(workout => `${workout.type}: ${workout.minutes} mins`).join(', ');
  }

  //get data from local storage
  private loadDataFromLocalStorage(): void {
    const savedData = JSON.parse(localStorage.getItem('newWorkout') || '[]');
    this.dataSource.data = savedData;

    this.workoutService.setInitialData(savedData);
  }
}




