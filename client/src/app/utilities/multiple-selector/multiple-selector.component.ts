import { Component, Input, OnInit } from '@angular/core';
import { multipleSelector } from 'src/app/_models/multiple-selector';

@Component({
  selector: 'app-multiple-selector',
  templateUrl: './multiple-selector.component.html',
  styleUrls: ['./multiple-selector.component.css']
})
export class MultipleSelectorComponent implements OnInit {

  constructor() { }

@Input() SelectedItems: multipleSelector[] = [];
@Input() NonSelectedItems: multipleSelector[] = [];

ngOnInit(): void {
  }

  select(item: multipleSelector, index: number){
    this.SelectedItems.push(item);
    this.NonSelectedItems.splice(index, 1);
  }
  deselect(item: multipleSelector, index: number){
    this.NonSelectedItems.push(item);
    this.SelectedItems.splice(index, 1);
  }

  selectAll(){
    this.SelectedItems.push(...this.NonSelectedItems);
    this.NonSelectedItems = [];
  }

  deSelectAll(){
    this.NonSelectedItems.push(...this.SelectedItems);
    this.SelectedItems = [];
  }
}
