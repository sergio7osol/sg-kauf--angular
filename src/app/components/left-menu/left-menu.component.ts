import { Component, Input, Output, OnInit, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import DetailedDateInfo from '../../types/DetailedDateInfo';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
})
export class LeftMenuComponent implements OnInit {
  @Input() items: DetailedDateInfo[];
  @Input() loadingItem: string;
  @Input() activeItem: DetailedDateInfo;
  @Output() itemSelected = new EventEmitter<DetailedDateInfo>();

  constructor() {}

  ngOnInit(): void {}

  selectItem(item: DetailedDateInfo) {
    this.itemSelected.emit(item);
  }

  countProducts (date: DetailedDateInfo): number {
    if (date.count) {
      return date.count;
    }
    let productQuantity: number | undefined = date?.buys?.reduce((quantity, buy) => {
      if (buy.products && buy.products.length) {
        quantity += buy.products.length;
      }
      return quantity;
    }, 0);
    productQuantity = productQuantity === undefined ? 0 : productQuantity;
    return productQuantity;
  };
}



