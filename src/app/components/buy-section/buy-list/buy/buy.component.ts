import { Component, Input, OnInit } from '@angular/core';
import BuyInfo from '../../../../types/BuyInfo';
import Product from 'src/app/types/Product';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {
  @Input() buy: BuyInfo;

  constructor() { }

  remove (buy: BuyInfo) {
    // store.methods.removeBuy(buy);
    console.log('remove');
  }

  sendProductToRemove (date: string, time: string, productInfoForRemove: Product) {
    console.log('sendProductToRemove');

    // store.methods.removeProduct(date, time, productInfoForRemove);
  }

  ngOnInit(): void {
  }
}
