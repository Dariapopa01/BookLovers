import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/_models/review';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
reviews: Review[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
