export interface Covid19DataContext {
  daily: Array<any>;
  monthly: Array<any>;
  ambulances: Array<any>;
  isLoading: boolean;
}

export type MonthlyData = Array<MonthlyDataItem>;

export type DailyData = Array<DailyDataItem>;

export interface MonthlyDataItem {
  date: string;
  sumTested: number;
  sumDeaths: number;
  sumPositive: number;
  sumHospitalized: number;
  onRespiratorForDate: number;
}

export type DailyDataItem = {
  deathsForDate: number;
  testedForDate: number;
  positiveForDate: number;
  hospitalizedForDate: number;
};

export interface MonthlyDataProps {
  data: MonthlyData;
}

export interface LineChartProps {
  data: ChartDataProps;
  type?: 'monthly' | 'daily';
}

export interface StackedBarProps {
  data: ChartDataProps;
}

export interface ChartDataProps {
  deaths: Array<ChartDataItem>;
  tested: Array<ChartDataItem>;
  confirmed: Array<ChartDataItem>;
  hospitalized: Array<ChartDataItem>;
  onRespirator?: Array<ChartDataItem>;
}

export enum CovidPageViewEnum {
  Graphic = 'graphic',
  Ambulances = 'ambulances',
}

export type ChartDataItem = Array<number>;
