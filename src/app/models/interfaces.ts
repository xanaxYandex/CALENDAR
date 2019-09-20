export interface IIngestion {
  title: string;
  calories: number;
  fats: number;
  proteins: number;
  carbohydrates: number;
}

export interface ICurrentMeal {
  ingestion: IIngestion;
  now: string;
}

export interface INewMeal {
  day: number;
  hour: string;
  ingestion: IIngestion;
}

export interface IDayCalories {
  kcal: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  color: string;
}

export interface ISelectedDay {
  info: IDayCalories;
  thisDay: string;
  ingestions: IIngestion[];
}
