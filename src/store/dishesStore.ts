import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { DishesState, Meal } from '../types';

export const useDishesStore = create<DishesState>()(
  devtools(
    persist(
      (set, get) => ({
        dishes: [],
        isLoading: false,
        error: null,
        showStepOneErrors: false,
        showStepTwoErrors: false,
        selectedMeal: null,
        selectedPeople: 1,
        selectedRestaurant: null,
        fetchDishes: async () => {
          try {
            set({ isLoading: true, error: '' });
            const response = await fetch('/src/data/dishes.json');
            if (!response.ok) {
              const message = `An error has occured: ${response.status}`;
              set({ error: message, dishes: [] });
              throw new Error(message);
            }
            const data = await response.json() as DishesState;
            const allDishes = data.dishes;
            const filteredDishes = allDishes.filter(dish => {
              return dish.restaurant === get().selectedRestaurant && dish.availableMeals.includes(get().selectedMeal as Meal);
            });
            set({ dishes: filteredDishes });
          } catch (error) {
            console.error(error);
          } finally {
            set({ isLoading: false});
          }
        },
        updateShowStepOneErrors: (value) => {
          set({ showStepOneErrors: value});
        },
        updateShowStepTwoErrors: (value) => {
          set({ showStepTwoErrors: value});
        },
        updateSelectedMeal: (meal) => {
          set({ selectedMeal: meal });
        },
        updateSelectedPeople: (value) => {
          set({ selectedPeople: value });
        },
        updateSelectedRestaurant: (restaurant) => {
          set({ selectedRestaurant: restaurant });
        },
      }),
      {
        name: 'dishes-storage',
      }
    )
  )
);