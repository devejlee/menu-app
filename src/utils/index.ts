import { Restaurant, Dish } from '../types';

export const getRestaurantArray = (dishes: Dish[], allRestaurants: Restaurant[]): Restaurant[] => {
  const restaurantSet = new Set(dishes.map(dish => dish.restaurant));
  return allRestaurants.filter(restaurant => restaurantSet.has(restaurant));
};