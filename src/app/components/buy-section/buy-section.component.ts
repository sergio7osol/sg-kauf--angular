import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import DetailedDateInfo from '../../types/DetailedDateInfo';
import BuyInfo from '../../types/BuyInfo';

@Component({
  selector: 'app-buy-section',
  templateUrl: './buy-section.component.html',
  styleUrls: ['./buy-section.component.scss']
})
export class BuySectionComponent implements OnInit {
  @Input() activeDate: DetailedDateInfo;
  @Output() buyRemoved = new EventEmitter<BuyInfo>();

  constructor() { }

  ngOnInit(): void {
  }

  removeBuy(buy: BuyInfo) {
    this.buyRemoved.emit(buy);
  }
}
