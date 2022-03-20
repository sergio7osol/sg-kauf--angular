import { Component, OnInit } from '@angular/core'
import { ShoppingDatesService } from './services/shopping-dates.service'
import DetailedDateInfo from './types/DetailedDateInfo'
import BuyInfo from './types/BuyInfo'

interface AppState {
  appTitle: string,
  shoppingDates: DetailedDateInfo[],
  activeDate: DetailedDateInfo,
  loadingDate: string
}
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
  setActiveDate (newDate: string) {
    const dateToSelect = this.shoppingDates.find(item => item.date === newDate);
    if (!dateToSelect) {
        console.warn(`Chosen date ${newDate} for loading buys was not found. No date is selected.`);
        this.activeDate = {} as DetailedDateInfo;
    }
    if (dateToSelect.buys) {
      this.activeDate = { ...dateToSelect };
      this.setLoadingDate('');
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
    }
  }
}
