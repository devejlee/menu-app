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
  name: string;
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
  selectedDishes: SelectedDish[];
  fetchDishes: () => void;
  updateShowStepOneErrors: (value: boolean) => void;
  updateShowStepTwoErrors: (value: boolean) => void;
  updateSelectedMeal: (meal: Meal) => void;
  updateSelectedPeople: (value: number) => void;
  updateSelectedRestaurant: (restaurant: Restaurant) => void;
  updateSelectedDishes: (name: string, servings: number) => void;
}