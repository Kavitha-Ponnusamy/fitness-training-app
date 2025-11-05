import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-training',
  standalone: true,
  imports: [
    MatTabsModule,
    PastTrainingsComponent,
    NewTrainingComponent,
    CurrentTrainingComponent,
    CommonModule,
  ],
  templateUrl: './training.component.html',
  styleUrl: './training.component.css',
})
export class TrainingComponent implements OnInit {
  ongoingTraining = false;
  constructor() {}
  ngOnInit(): void {}
}
