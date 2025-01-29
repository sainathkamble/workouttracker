import { Component , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { WorkoutService, PeriodicElement, Workout  } from '../../service/workout.service';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ChartModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})

export class ChartComponent implements OnInit {

  basicData: any;
  basicOptions: any;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workoutService.workoutData$.subscribe(data => {
      this.updateChartData(data);
    });

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  //update data on chart
  private updateChartData(data: PeriodicElement[]) {

    const workoutTypes: { [key: string]: number } = {};

    //calculate total duration for each workout type in data
    data.forEach(item => {
      item.workouts.forEach(workout => {
        if (!workoutTypes[workout.type]) {
          workoutTypes[workout.type] = 0;
        }
        workoutTypes[workout.type] += workout.minutes;
      });
    });
    
    //get labels and durations for chart
    const labels = data.map(item => item.name);
    const durations = data.map(item => item.workouts.reduce((acc, workout) => acc + workout.minutes, 0));

    //schema for chart
    this.basicData = {
      labels: labels,
      datasets: [
        {
          label: 'Total Duration (Minutes)',
          data: durations,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 1
        }
      ]
    };
  }
}
