import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { DishesState, Dish } from '../types';

export const useDishesStore = create<DishesState>()(
  devtools(
    persist(
      (set) => ({
        dishes: [],
        setDishes: (data) => {
          set((state) => ({
            dishes: data
          }));
        }
      }),
      {
        name: 'dishes-storage',
      }
    )
  )
)