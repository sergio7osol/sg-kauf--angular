import { Component, OnInit } from '@angular/core'
import { ShoppingDatesService } from './services/shopping-dates.service'
import DetailedDateInfo from './types/DetailedDateInfo'
import BuyInfo from './types/BuyInfo'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ShoppingDatesService],
})
export class AppComponent implements OnInit {
  appTitle = 'SG Kauf';
  shoppingDates: DetailedDateInfo[] = [];
  activeDate = {} as DetailedDateInfo;
  loadingDate: string = '';

  constructor(private shoppingDatesService: ShoppingDatesService) {
    this.setLoadingDate = this.setLoadingDate.bind(this);
    this.setActiveDate = this.setActiveDate.bind(this);
  }

  ngOnInit(): void {
    this.getShoppingDates();
  }

  getShoppingDates = async ():Promise<void> => {
    const fetchedShoppingDates = await this.shoppingDatesService.getAllDates();
    if (fetchedShoppingDates && fetchedShoppingDates.length) {
      this.shoppingDates = fetchedShoppingDates;
    } else {
      console.error('Problem. No dates for left menu loaded.');
    }
  }

  onDateSelected(shoppingDate: DetailedDateInfo) {
    this.setLoadingDate(shoppingDate.date);
    this.setActiveDate(shoppingDate.date);
  }

  setLoadingDate (newDate: string) {
    if (newDate === '' || newDate.split('.').length === 3) { // TODO: improve checking
      this.loadingDate = newDate;
      console.log('Loading date SET: ', newDate);
    }
    else  {
      console.warn('Wrong format for "loading date"');
    }
  }

  setActiveDate (newDate: string): boolean {
    const dateToSelect = this.shoppingDates.find(item => item.date === newDate);
    if (!dateToSelect) {
        console.warn(`Chosen date ${newDate} for loading buys was not found. No date is selected.`);
        this.activeDate = {} as DetailedDateInfo;
        return false;
    }
    if (dateToSelect.buys) {
      this.activeDate = { ...dateToSelect };
      this.setLoadingDate('');
      return true;
    } else {
      this.shoppingDatesService.readDate(newDate)
        .then((data: BuyInfo[]) => {
            if (data?.length) {
                dateToSelect.buys = data;
                (dateToSelect.count !== undefined && dateToSelect.count !== null) && Reflect.deleteProperty(dateToSelect, 'count');
                this.activeDate = dateToSelect;
                this.setLoadingDate('');
            } else {
              console.warn(`Received no dates data for ${newDate}`);
            }
        })
        .catch(err => console.log('Fetch Error :-S', err));
        return true;
    }
  }

  removeBuy(buy: BuyInfo) {
    const existingShoppingDate = this.shoppingDates.find((shoppingDate: DetailedDateInfo) => shoppingDate.date === buy.date);
    const existingBuy = existingShoppingDate && existingShoppingDate.buys?.find((buyItem: BuyInfo) => buyItem.time === buy.time);
    if (!existingBuy) {
      console.log(`Buy for deleting on ${buy.date} at ${buy.time} was not found.`);
      return false;
    }

    if (confirm('Are you sure, you want to delete this buy?')) {
      console.log(`Prompted deleting of the buy. Confirmed. The buy on ${buy.date} at ${buy.time} is going to be deleted...`);
    } else {
      console.log(`Prompted deleting of the buy. Rejected. The buy on ${buy.date} at ${buy.time} is NOT going to be deleted.`);
      return false;
    }
    const urlSuffix = `date=${buy.date}&time=${buy.time}`;

    this.shoppingDatesService.deleteBuy(urlSuffix) // TODO: make no response from server -> do it locally
      .then((newArray: BuyInfo[]) => {
          if (newArray) {
              console.log(`The buy on ${buy.date} at ${buy.time} was successfully removed. ${newArray.length} buys left for this date.`);
              if (newArray.length) {
                  if (existingShoppingDate && existingShoppingDate.buys) {
                      existingShoppingDate.buys = newArray;
                  }
              } else if (existingShoppingDate) {
                  console.log(`Date ${buy.date} with no buys left is going to be removed...`);
                  const indexOfDateToDelete = this.shoppingDates.indexOf(existingShoppingDate);
                  console.log('index of date to delete: ', indexOfDateToDelete);
                  this.shoppingDates.splice(indexOfDateToDelete, 1);
                  this.setActiveDate('');

                  // TODO: add another possibility for deleting date - separately
                  //   if (confirm(`There are no buys left for date ${buy.date}, do you want to delete this shopping date completely?`)) {
                  //     console.log(`Prompted deleting of the date. Confirmed. The date ${buy.date} is going to be deleted...`);
                  //     const indexOfDateToDelete = state.shoppingDates.find(shoppingDate => shoppingDate === existingShoppingDate);
                  //     console.log('indexOfDateToDelete > ', indexOfDateToDelete);
                  //   } else {
                  //     console.log(`Prompted deleting of the date. Rejected. The date ${buy.date} is NOT going to be deleted.`);
                  //     return false;
                  //   }
              }
          }
      })
      .catch(function (err) {
          console.log('Fetch Error :-S', err);
      });
    }
  // sendProductToRemove (date: string, time: string, productInfoForRemove: Product) {
    // store.methods.removeProduct(date, time, productInfoForRemove);
  // };
}
