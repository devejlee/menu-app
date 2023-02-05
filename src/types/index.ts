export type OptionType = 'dish' | 'meal' | 'restaurant'

export type Restaurant = 'Mc Donalds' | 'Taco Bell' | 'BBQ Hut' | 'Vege Deli' | 'Pizzeria' | 'Panda Express' | 'Olive Garden';

export type Meal = 'breakfast' | 'lunch' | 'dinner';

export interface Dish {
  id: number;
  name: string;
  restaurant: Restaurant;
  availableMeals: Meal[];
}

export interface SelectedDish {
  id: number | null;
  name: string | null;
  servings: number
}

export interface DishesState {
  dishes: Dish[];
  dishesFilteredByMeals: Dish[];
  dishesFilteredByRestaurants: Dish[];
  isLoading: boolean;
  error: string | null;
  showStepOneErrors: boolean;
  showStepTwoErrors: boolean;
  selectedMeal: Meal | null;
  selectedPeople: number;
  selectedRestaurant: Restaurant | null;
  selectedDish: SelectedDish;
  selectedServings: number;
  selectedDishes: SelectedDish[];
  fetchDishes: () => void;
  updateShowStepOneErrors: (value: boolean) => void;
  updateShowStepTwoErrors: (value: boolean) => void;
  updateSelectedMeal: (meal: Meal) => void;
  updateSelectedPeople: (value: number) => void;
  updateSelectedRestaurant: (restaurant: Restaurant) => void;
  addSelectedDishes: () => void;
  updateSelectedDish: (id: number | null, name: string, servings: number) => void;
  resetSelectedDish: () => void;
  updateSelectedServings: (value: number) => void;
  resetSelectedServings: () => void;
  removeSelectedDishes: (id: number) => void;
}