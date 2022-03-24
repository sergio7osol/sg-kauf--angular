import { Component, Input, OnInit } from '@angular/core';
import DetailedDateInfo from '../../types/DetailedDateInfo';

@Component({
  selector: 'app-buy-section',
  templateUrl: './buy-section.component.html',
  styleUrls: ['./buy-section.component.scss']
})
export class BuySectionComponent implements OnInit {
  @Input() activeDate: DetailedDateInfo;

  constructor() { }

  ngOnInit(): void {
  }

}
