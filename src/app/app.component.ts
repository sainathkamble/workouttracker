import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { BrowserModule } from '@angular/platform-browser';
// import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatOptionModule } from '@angular/material/core';
// import { MatTableModule } from '@angular/material/table';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { FormsModule } from '@angular/forms';

import { InputsComponent } from './components/inputs/inputs.component';
import { GridComponent } from './components/grid/grid.component';
import { ChartComponent } from './components/chart/chart.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    InputsComponent,GridComponent,ChartComponent,
    RouterOutlet,
    //BrowserModule,
    // CommonModule,
    // BrowserAnimationsModule,
    // FormsModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatSelectModule,
    // MatOptionModule,
    // MatTableModule,
    // MatPaginatorModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fyleIntrenshipAssignment';
}
