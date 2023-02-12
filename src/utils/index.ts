import { Dish } from '../types';

export const getRestaurantArray = (dishes: Dish[]) => {
  return [...new Set(dishes.map(dish => dish.restaurant))];
};

export const removeDuplicateDishes = (dishes: Dish[]) => {
  let uniqueDishes: Dish[] = [];
  dishes.forEach(dish => {
    let duplicate = uniqueDishes.find(d => d.name === dish.name);
    if (!duplicate) {
      uniqueDishes.push(dish);
    }
  });
  return uniqueDishes;
};