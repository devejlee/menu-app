import DishWithServing from '../DishWithServing/DishWithServing';
import { useDishesStore } from '../../store/dishesStore';
import PreviousButton from '../PreviousButton/PreviousButton';
import { useState, useEffect } from 'react';

const StepThree = () => {
  const selectedPeople = useDishesStore(state => state.selectedPeople);
  const selectedDishes = useDishesStore(state => state.selectedDishes);
  const selectedDish = useDishesStore(state => state.selectedDish);
  const dishesFilteredByRestaurants = useDishesStore(state => state.dishesFilteredByRestaurants);
  const dishesFilteredBySelectedDishes = dishesFilteredByRestaurants.filter(dish => !selectedDishes.some(selectedDish => dish.id === selectedDish.id));
  const addSelectedDishes = useDishesStore(state => state.addSelectedDishes);
  const resetSelectedDish = useDishesStore(state => state.resetSelectedDish);
  const resetSelectedDishes = useDishesStore(state => state.resetSelectedDishes);
  const resetSelectedServings = useDishesStore(state => state.resetSelectedServings);

  const selectedDishesServings = selectedDishes.reduce((total, dish) => {
    return total + dish.servings;
  }, 0);

  const totalServings = selectedDish.servings + selectedDishesServings;

  const [dishNotSelectedError, setDishNotSelectedError] = useState(false);
  const [totalServingsOverMaxError, setTotalServingsOverMaxError] = useState(false);
  const [totalServingsUnderMinError, setTotalServingsUnderMinError] = useState(false);

  const handleClick = () => {
    if (selectedDish.id === null) {
      setDishNotSelectedError(true);
      return;
    }
    if (totalServings > 10) {
      return;
    }
    addSelectedDishes();
    resetSelectedDish();
    resetSelectedServings();
  };

  const handleReset = () => {
    resetSelectedDish();
    resetSelectedServings();
    resetSelectedDishes();
    setTotalServingsUnderMinError(false);
  };

  useEffect(() => {
    if (selectedDish.id !== null) {
      setDishNotSelectedError(false);
    }
  }, [selectedDish.id]);

  useEffect(() => {
    setTotalServingsOverMaxError(totalServings > 10 && selectedDish.id !== null);
  }, [totalServings, selectedDish.id]);

  useEffect(() => {
    resetSelectedDish();
    resetSelectedServings();
  }, [resetSelectedDish, resetSelectedServings]);

  useEffect(() => {
    setTotalServingsUnderMinError(selectedDishesServings > 0 && selectedDishesServings < selectedPeople);
  }, [selectedDishesServings, selectedPeople]);

  return (
    <main>
      <>
        {selectedDishes.length > 0 && <p className='text-center mt-4'>Your orders:</p>}
        {selectedDishes.map(({ id, name, servings }) => (
          <DishWithServing id={id} name={name} servings={servings} key={id} disabled={true} />
        ))}
      </>
      <DishWithServing />
      <PreviousButton url='/step-two' />
      <button className='mt-2 ml-4 rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900' onClick={handleReset}>Reset</button>
      {dishesFilteredBySelectedDishes.length > 0 && (
        <button className='mt-2 ml-4 rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900' onClick={handleClick}>Add Dish</button>
      )}
      {dishNotSelectedError && (
        <p className='mt-4 text-red-500'>Dish not selected</p>
      )}
      {totalServingsOverMaxError && (
        <p className='mt-4 text-red-500'>Selected servings over maximum (10)</p>
      )}
      {totalServingsUnderMinError && (
        <p className='mt-4 text-red-500'>Total servings ({selectedDishesServings}) under minimum ({selectedPeople})</p>
      )}
    </main>
  );
};

export default StepThree;