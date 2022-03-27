import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import BuyInfo from '../../../../types/BuyInfo';
import Product from 'src/app/types/Product';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {
  @Input() buy: BuyInfo;
  @Output() buyRemoved = new EventEmitter<BuyInfo>();

  constructor() { }

  remove (buy: BuyInfo) {
    // store.methods.removeBuy(buy);
    this.buyRemoved.emit(buy);
  }

  sendProductToRemove (date: string, time: string, productInfoForRemove: Product) {
    // store.methods.removeProduct(date, time, productInfoForRemove);
    console.log('sendProductToRemove');
  }

  ngOnInit(): void {
  }
}
