import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import BuyInfo from '../../../types/BuyInfo';

@Component({
  selector: 'app-buy-list',
  templateUrl: './buy-list.component.html',
  styleUrls: ['./buy-list.component.scss']
})
export class BuyListComponent implements OnInit {
  @Input() buys: BuyInfo[];
  @Output() buyRemoved = new EventEmitter<BuyInfo>();

  constructor() { }

  ngOnInit(): void {
  }

  removeBuy(buy: BuyInfo) {
    console.log('buy-list: EMIT buyRemoved');
    this.buyRemoved.emit(buy);
  }
}
