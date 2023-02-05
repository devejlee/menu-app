import { Restaurant, Dish } from '../types';

const restaurants: Restaurant[] = ['Mc Donalds', 'Taco Bell', 'BBQ Hut', 'Vege Deli', 'Pizzeria', 'Panda Express', 'Olive Garden'];

export const getRestaurantArray = (dishes: Dish[]): Restaurant[] => {
  const restaurantSet = new Set(dishes.map(dish => dish.restaurant));
  return restaurants.filter(restaurant => restaurantSet.has(restaurant));
};