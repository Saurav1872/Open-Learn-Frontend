import { NgClass } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snack',
  standalone: true,
  imports: [MatIconModule, NgClass],
  templateUrl: './custom-snack.component.html',
  styleUrl: './custom-snack.component.scss'
})
export class CustomSnackComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    console.log(data);
  }

  ngOnInit() { }

  iconMap = new Map([
    ['success', 'done'],
    ['error', 'error'],
    ['warn', 'warning'],
    ['info', 'info']
  ]);
  iconColorMap = new Map([
    ['success', '#22bb33'],
    ['error', '#bb2124'],
    ['warn', '#ff0505'],
    ['info', '#5bc0de']
  ]);
  
  getIcon() {
    return this.data.snackType ? this.iconMap.get(this.data.snackType.toLowerCase()) || 'help' : 'help';
  }
  
  getIconColor() {
    return this.data.snackType ? this.iconColorMap.get(this.data.snackType.toLowerCase()) || 'white' : 'white';
  }
  
}
