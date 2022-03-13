import DetailedDateInfo from '@/types/DetailedDateInfo';
import ValueCollection from '@/types/ValueCollection';

export default interface SgKaufState {
  shoppingDates: DetailedDateInfo[];
  activeDate: DetailedDateInfo;
  loadingDate: string;
  ValueCollection: ValueCollection
}
