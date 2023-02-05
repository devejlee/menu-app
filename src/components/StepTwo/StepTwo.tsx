import Dropdown from '../Dropdown/Dropdown';
import { useDishesStore } from '../../store/dishesStore';
import PreviousButton from '../PreviousButton/PreviousButton';
import { getRestaurantArray } from '../../utils';

const StepTwo = () => {
  const dishesFilteredByMeals = useDishesStore(state => state.dishesFilteredByMeals);
  const newRestaurantArray = getRestaurantArray(dishesFilteredByMeals);

  return (
    <main className='mt-4'>
      <p>Please select a restaurant</p>
      <Dropdown options={newRestaurantArray} optionType='restaurant' />
      <PreviousButton url='/' />
    </main>
  );
};

export default StepTwo;