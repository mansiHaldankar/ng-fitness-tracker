import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training-service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state']
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( private trainingService : TrainingService ) { }

  ngOnInit() {
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercices();
  }
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }
    
  
  

}
