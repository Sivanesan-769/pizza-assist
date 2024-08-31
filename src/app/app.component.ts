import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImportsModule } from '../assets/common/imports';
import { DataService } from '../services/data.service';
import { NgFor } from '@angular/common';
import { PizzaSize } from '../enum/pizza-size.enum';
import { ExtraLargeSizeTotal, LargeSizeTotal, MediumSizeTotal, SmallSizeTotal } from '../constant/constant';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImportsModule, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [DataService],
})
export class AppComponent {
  title = 'pizza-assist';
  api = inject(DataService);
  data: any;

  smallSizeTotal: number = 5;
  mediumSizeTotal: number = 6;
  largeSizeTotal: number = 7;
  extraLargeSizeTotal: number = 8;

  columns: any = [
    {
      name: 'Small',
      price: 5,
      isChecked: false,
    },
    {
      name: 'Medium',
      price: 7,
      isChecked: false,
    },
    {
      name: 'Large',
      price: 8,
      isChecked: false,
    },
    {
      name: 'Extra Large',
      price: 9,
      isChecked: false,
    },
  ];

  checkboxState: boolean[][] = [];

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.api.getData().then((data: any) => {
      this.data = data;
      if (this.data && this.columns) {
        this.initializeCheckboxState();
      } else {
        console.error('Data or columns are not defined.');
      }
    });
  }

  initializeCheckboxState(): void {
    this.checkboxState = this.data.map(() => this.columns.map(() => false));
  }

  checkedData(rowIndex: number, colIndex: PizzaSize, isChecked: boolean): void {
    const sizeTotals = {
      [PizzaSize.Small]: SmallSizeTotal,
      [PizzaSize.Medium]: MediumSizeTotal,
      [PizzaSize.Large]: LargeSizeTotal,
      [PizzaSize.ExtraLarge]: ExtraLargeSizeTotal
    } as const;
  
    const priceChange = isChecked ? this.data[rowIndex].price : -this.data[rowIndex].price;
    this[sizeTotals[colIndex]] += priceChange;
    this[sizeTotals[colIndex]] = parseFloat((this[sizeTotals[colIndex]]).toFixed(2));
  }
}
