import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { DishesState } from '../types';

export const useDishesStore = create<DishesState>()(
  devtools(
    persist(
      (set) => ({
        dishes: [],
        isLoading: false,
        error: '',
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
            set({ dishes: data.dishes });
          } catch (error) {
            console.error(error);
          } finally {
            set({ isLoading: false});
          }
        }
      }),
      {
        name: 'dishes-storage',
      }
    )
  )
)