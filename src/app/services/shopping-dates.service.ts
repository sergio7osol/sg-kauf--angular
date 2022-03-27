import { EventEmitter, Injectable } from '@angular/core';
import BuyInfo from '../types/BuyInfo';
import DetailedDateInfo from '../types/DetailedDateInfo';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ShoppingDatesService {
  private shoppingDates: BuyInfo[];
  private apiClient = axios.create({
    baseURL: 'http://localhost:3030',
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  statusUpdated = new EventEmitter<string>();

  constructor() {}

  getAllShoppingDates() {
    let shoppingDates = this.shoppingDates;
    shoppingDates =
      shoppingDates && shoppingDates.length ? shoppingDates.slice() : [];

    console.log(`Got all - ${shoppingDates.length} - shopping dates`);

    return shoppingDates;
  }

  getAllDates(): Promise<DetailedDateInfo[]> {
    return this.apiClient.get('/list-dates').then((response) => {
      if (response.status !== 200) {
        throw Error(
          'Looks like there was a problem. Status Code: ' + response.status
        );
      }
      return response.data;
    });
  }

  readDate(newDate: string): Promise<BuyInfo[]> {
    return this.apiClient.get(`/read-date?date=${newDate}`).then((response) => {
      if (response.status !== 200) {
        throw Error(
          'Looks like there was a problem. Status Code: ' + response.status
        );
      }
      return response.data;
    });
  }

  deleteBuy(dataSuffix: string): Promise<BuyInfo[]> {
    return this.apiClient.get('/remove-buy?' + dataSuffix).then((response) => {
      if (response.status !== 200) {
        throw Error(
          'Looks like there was a problem. Status Code: ' + response.status
        );
      }
      return response.data;
    });
  }

  // utils
  fetchAllShoppingDates() {
    const url = `http://localhost:3030/get-shopping-dates`;

    return fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(
            'Looks like there was a problem. Status Code: ' + response.status
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched all shopping dates: ', data);
        return (this.shoppingDates = data);
      })
      .catch((err) => {
        console.log('Fetch Error :-S', err);
      });
  }
  // createBuyDate(shoppingDate: Buy) {
  //   // const date = shoppingDate.date;
  //   const time = shoppingDate.time;
  //   const currency = shoppingDate.currency;
  //   const country = shoppingDate.address.country;
  //   const city = shoppingDate.address.city;
  //   const index = shoppingDate.address.index;
  //   const street = shoppingDate.address.street;
  //   const houseNumber = shoppingDate.address.houseNumber;
  //   const payMethod = shoppingDate.payMethod;
  //   const shopName = shoppingDate.shopName;
  //   //   const products = shoppingDate.localProducts;

  //   let url = `http://localhost:3030/save-buy?date=${date}&time=${time}`;
  //   url += currency ? `&currency=${currency}` : '';
  //   url += country ? `&country=${country}` : '';
  //   url += city ? `&city=${city}` : '';
  //   url += index ? `&index=${index}` : '';
  //   url += street ? `&street=${street}` : '';
  //   url += houseNumber ? `&houseNumber=${houseNumber}` : '';
  //   url += payMethod ? `&payMethod=${payMethod}` : '';
  //   url += shopName ? `&shopName=${shopName}` : '';

  //   console.log('RAW url >: ', url);
  //   //   url = encodeURIComponent(url);

  //   fetch(url)
  //     .then((response) => {
  //       if (response.status !== 200) {
  //         console.log(
  //           'Looks like there was a problem. Status Code: ' + response.status
  //         );
  //         return;
  //       }

  //       response.json().then(function (data) {
  //         console.log('RESP data: ', data);
  //         thisApp.activeDateBuys = [...data];
  //       });
  //     })
  //     .catch(function (err) {
  //       console.log('Fetch Error :-S', err);
  //     });
  // }
  // dateChanged(newDate: string) {
  //   this.loggingService.logStatusChange(newDate);
  //   // this.emptyBuy.date = newDate;
  // }
  // changeTime(newTime: string) {
  //   this.emptyBuy.time = newTime;
  // }
}
