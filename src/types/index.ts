export type Restaurant = 'Mc Donalds' | 'Taco Bell' | 'BBQ Hut' | 'Vege Deli' | 'Pizzeria' | 'Panda Express' | 'Olive Garden';

export type Meal = 'breakfast' | 'lunch' | 'dinner';

export interface Dish {
  id: number;
  name: string;
  restaurant: Restaurant;
  availableMeals: Meal[];
}

export interface DishesState {
  dishes: Dish[];
  isLoading: boolean;
  error: string;
  selectedMeal: Meal,
  selectedPeople: number,
  fetchDishes: () => void
  updateSelectedMeal: (meal: Meal) => void
  updateSelectedPeople: (value: number) => void
}