import { Component, Input, OnInit } from '@angular/core';
import BuyInfo from '../../../types/BuyInfo';

@Component({
  selector: 'app-buy-list',
  templateUrl: './buy-list.component.html',
  styleUrls: ['./buy-list.component.scss']
})
export class BuyListComponent implements OnInit {
  @Input() buys: BuyInfo[];

  constructor() { }

  ngOnInit(): void {
  }

}
