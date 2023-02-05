import DishWithServing from '../DishWithServing/DishWithServing';
import { useDishesStore } from '../../store/dishesStore';

const StepThree = () => {
  const selectedDishes = useDishesStore(state => state.selectedDishes);
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
      <button className='btn btn-primary mt-2' onClick={handleClick}>Add Dish</button>
    </main>
  );
};

export default StepThree;