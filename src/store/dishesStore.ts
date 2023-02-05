import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { DishesState, Meal } from '../types';

export const useDishesStore = create<DishesState>()(
  devtools(
    persist(
      (set, get) => ({
        dishes: [],
        dishesFilteredByMeals: [],
        dishesFilteredByRestaurants: [],
        isLoading: false,
        error: null,
        showStepOneErrors: false,
        showStepTwoErrors: false,
        selectedMeal: null,
        selectedPeople: 1,
        selectedRestaurant: null,
        selectedDish: {
          id: null,
          name: null,
          servings: 1,
        },
        selectedServings: 1,
        selectedDishes: [{
          id: null,
          name: null,
          servings: 1,
        }],
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
            const dishes = data.dishes;
            const dishesFilteredByMeals = dishes.filter(dish => {
              return dish.availableMeals.includes(get().selectedMeal as Meal);
            });
            const dishesFilteredByRestaurants = dishesFilteredByMeals.filter(dish => {
              return dish.restaurant === get().selectedRestaurant;
            });
            set({ dishesFilteredByMeals: dishesFilteredByMeals });
            set({ dishesFilteredByRestaurants: dishesFilteredByRestaurants });
            set({ dishes: dishes });
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
            console.log('value', value);
            const test = {
              ...state.selectedDish,
              servings: value,
            };
            console.log('test', test);
            return {
              selectedServings: value,
              selectedDish: test
            };
          });
        },        
        resetSelectedServings: () => {
          set({ selectedServings: 1 });
        },
        addSelectedDishes: () => {
          set(state => {
            return {
              selectedDishes: [...state.selectedDishes, get().selectedDish]
            };
          });
        },    
        removeSelectedDishes: (id) => {
          set(state => {
            return {
              selectedDishes: state.selectedDishes.filter(dish => dish.id !== id)
            };
          });
        }   
      }),
      {
        name: 'dishes-storage',
      }
    )
  )
);