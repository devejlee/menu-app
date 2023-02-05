import Dropdown from '../Dropdown/Dropdown';
import { useDishesStore } from '../../store/dishesStore';
import PreviousButton from '../PreviousButton/PreviousButton';
import { getRestaurantArray } from '../../utils';

const StepTwo = () => {
  const dishesFilteredByMeals = useDishesStore(state => state.dishesFilteredByMeals);
  const showStepTwoErrors = useDishesStore(state => state.showStepTwoErrors);
  const selectedRestaurant = useDishesStore(state => state.selectedRestaurant);

  const error = !selectedRestaurant && showStepTwoErrors;

  const newRestaurantArray = getRestaurantArray(dishesFilteredByMeals);

  return (
    <main className='mt-4'>
      <p>Please select a restaurant</p>
      <Dropdown options={newRestaurantArray} optionType='restaurant' error={error} />
      {error && <p className='text-red-500'>Select a restaurant!</p>}
      <PreviousButton url='/' />
    </main>
  );
};

export default StepTwo;