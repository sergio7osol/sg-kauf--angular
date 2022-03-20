import { Component, Input, OnInit } from '@angular/core';
import BuyInfo from 'src/app/types/BuyInfo';

@Component({
  selector: 'app-buy-section',
  templateUrl: './buy-section.component.html',
  styleUrls: ['./buy-section.component.scss']
})
export class BuySectionComponent implements OnInit {
  @Input() buys: BuyInfo[];

  constructor() { }

  ngOnInit(): void {
  }

}
