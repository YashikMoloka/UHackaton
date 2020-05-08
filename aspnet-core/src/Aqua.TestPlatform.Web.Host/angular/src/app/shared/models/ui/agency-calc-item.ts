import {InputValues} from './input-values';
import {CurrencyValues} from './currency-values';

export class AgencyCalcItem {
  num?: number;
  name?: string;
  currency?: string;
  tariff?: number;
  operation?: number;
  quantity?: number;
  overtime?: number;
  formula?: string;
  rub?: string;
  usd?: string;

  rubCalc: (item: AgencyCalcItem, dic: InputValues, currency: CurrencyValues) => number;
}
