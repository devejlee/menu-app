import DishWithServing from '../DishWithServing/DishWithServing';
import { useDishesStore } from '../../store/dishesStore';

const StepThree = () => {
  const selectedDishes = useDishesStore(state => state.selectedDishes);
  const addSelectedDishes = useDishesStore(state => state.addSelectedDishes);
  const resetSelectedServings = useDishesStore(state => state.resetSelectedServings);

  console.log('selectedDishes', selectedDishes);

  const handleClick = () => {
    addSelectedDishes();
    resetSelectedServings();
  };

  return (
    <main className='mt-4'>
      {selectedDishes.map(({ id, name }) => (
        <DishWithServing id={id} name={name} key={id} />
      ))}
      <button className='btn btn-primary mt-2' onClick={handleClick}>Add Dish</button>
    </main>
  );
};

export default StepThree;