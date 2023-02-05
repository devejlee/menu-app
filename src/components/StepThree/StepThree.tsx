import DishWithServing from '../DishWithServing/DishWithServing';
import { useDishesStore } from '../../store/dishesStore';
import PreviousButton from '../PreviousButton/PreviousButton';

const StepThree = () => {
  const selectedDishes = useDishesStore(state => state.selectedDishes);
  const dishesFilteredByRestaurants = useDishesStore(state => state.dishesFilteredByRestaurants);
  const dishesFilteredBySelectedDishes = dishesFilteredByRestaurants.filter(dish => !selectedDishes.some(selectedDish => dish.id === selectedDish.id));
  const addSelectedDishes = useDishesStore(state => state.addSelectedDishes);
  const resetSelectedDish = useDishesStore(state => state.resetSelectedDish);
  const resetSelectedServings = useDishesStore(state => state.resetSelectedServings);

  const handleClick = () => {
    addSelectedDishes();
    resetSelectedDish();
    resetSelectedServings();
  };

  return (
    <main className='mt-4'>
      {selectedDishes.map(({ id, name, servings }) => (
        <DishWithServing id={id} name={name} servings={servings} key={id} />
      ))}
      <PreviousButton url='/step-two' />
      {dishesFilteredBySelectedDishes.length > 0 && (
        <button className='mt-2 ml-4 rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900' onClick={handleClick}>Add Dish</button>
      )}
    </main>
  );
};

export default StepThree;