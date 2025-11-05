import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@Component({
  selector: 'app-stop-training',
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatDialogModule, MatButtonModule],
  template: `
    <h1 mat-dialog-title>Are you sure?</h1>

    <mat-dialog-content>
      <p>You already got {{ passedData.progress }}%</p>
    </mat-dialog-content>

    <mat-dialog-actions fxLayout fxLayoutAlign="end center" fxLayoutGap="10px">
      <button mat-raised-button color="warn" [mat-dialog-close]="true">
        Yes
      </button>
      <button mat-raised-button color="primary" [mat-dialog-close]="false">
        No
      </button>
    </mat-dialog-actions>
  `,
})
export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}
}
