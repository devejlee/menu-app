import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { DishesState, Meal } from '../types';
import { removeDuplicateDishes } from '../utils';

export const useDishesStore = create<DishesState>()(
  devtools(
    persist(
      (set, get) => ({
        dishes: [],
        dishesFilteredByMeals: [],
        dishesFilteredByRestaurants: [],
        isLoading: false,
        error: null,
        selectedMeal: null,
        selectedPeople: 1,
        selectedRestaurant: null,
        selectedDish: {
          id: null,
          name: null,
          servings: 1,
        },
        selectedServings: 1,
        selectedDishes: [],
        fetchDishes: async () => {
          try {
            set({ isLoading: true, error: '' });
            const response = await fetch('/dishes.json');
            if (!response.ok) {
              const message = `An error has occured: ${response.status}`;
              set({ error: message, dishes: [] });
              throw new Error(message);
            }
            const data = await response.json() as DishesState;
            const dishes = data.dishes;
            const uniqueDishes = removeDuplicateDishes(dishes);
            const dishesFilteredByMeals = uniqueDishes.filter(dish => {
              return dish.availableMeals.includes(get().selectedMeal as Meal);
            });
            const dishesFilteredByRestaurants = dishesFilteredByMeals.filter(dish => {
              return dish.restaurant === get().selectedRestaurant;
            });
            set({ dishesFilteredByMeals: dishesFilteredByMeals });
            set({ dishesFilteredByRestaurants: dishesFilteredByRestaurants });
            set({ dishes: uniqueDishes });
          } catch (error) {
            console.error(error);
          } finally {
            set({ isLoading: false});
          }
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
        updateSelectedDish: (id, name, servings) => {
          set({ selectedDish: {
            id: id,
            name: name,
            servings: servings
          } });
        },
        resetSelectedDish: () => {
          set({ selectedDish: {
            id: null,
            name: null,
            servings: 1,
          } });
        },
        updateSelectedServings: (value) => {
          set(state => {
            const newSelectedDish = {
              ...state.selectedDish,
              servings: value,
            };
            return {
              selectedServings: value,
              selectedDish: newSelectedDish
            };
          });
        },        
        resetSelectedServings: () => {
          set({ selectedServings: 1 });
        },
        addSelectedDishes: () => {
          set(state => {
            return {
              selectedDishes: [...state.selectedDishes, state.selectedDish]
            };
          });
        },
        resetSelectedDishes: () => {
          set({ selectedDishes: [] });
        },        
      }),
      {
        name: 'dishes-storage',
      }
    )
  )
);