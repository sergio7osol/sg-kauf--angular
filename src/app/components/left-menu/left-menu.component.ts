import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
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
}



