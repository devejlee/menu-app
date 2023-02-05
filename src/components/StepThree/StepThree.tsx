import DishWithServing from '../DishWithServing/DishWithServing';
import { useDishesStore } from '../../store/dishesStore';
import PreviousButton from '../PreviousButton/PreviousButton';
import { useState, useEffect } from 'react';

const StepThree = () => {
  const selectedDishes = useDishesStore(state => state.selectedDishes);
  const selectedDish = useDishesStore(state => state.selectedDish);
  const dishesFilteredByRestaurants = useDishesStore(state => state.dishesFilteredByRestaurants);
  const dishesFilteredBySelectedDishes = dishesFilteredByRestaurants.filter(dish => !selectedDishes.some(selectedDish => dish.id === selectedDish.id));
  const addSelectedDishes = useDishesStore(state => state.addSelectedDishes);
  const resetSelectedDish = useDishesStore(state => state.resetSelectedDish);
  const resetSelectedServings = useDishesStore(state => state.resetSelectedServings);

  const [error, setError] = useState(false);

  const handleClick = () => {
    if (selectedDish.id === null) {
      setError(true);
      return;
    }
    addSelectedDishes();
    resetSelectedDish();
    resetSelectedServings();
  };

  useEffect(() => {
    if (selectedDish.id !== null) {
      setError(false);
    }
  }, [selectedDish.id]);

  return (
    <main className='mt-4'>
      {selectedDishes.map(({ id, name, servings }) => (
        <DishWithServing id={id} name={name} servings={servings} key={id} />
      ))}
      <PreviousButton url='/step-two' />
      {dishesFilteredBySelectedDishes.length > 0 && (
        <button className='mt-2 ml-4 rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900' onClick={handleClick}>Add Dish</button>
      )}
      {error && (
        <p className='mt-4 text-red-500'>Dish not selected</p>
      )}
    </main>
  );
};

export default StepThree;