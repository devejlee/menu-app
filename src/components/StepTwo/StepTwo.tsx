import Dropdown from '../Dropdown/Dropdown';
import { Restaurant } from '../../types';
import { useDishesStore } from '../../store/dishesStore';

const StepTwo = () => {
  const showStepTwoErrors = useDishesStore(state => state.showStepTwoErrors);
  const selectedRestaurant = useDishesStore(state => state.selectedRestaurant);

  const restaurants: Restaurant[] = ['Mc Donalds', 'Taco Bell', 'BBQ Hut', 'Vege Deli', 'Pizzeria', 'Panda Express', 'Olive Garden'];
  const error = !selectedRestaurant && showStepTwoErrors;

  return (
    <main className='mt-4'>
      <p>Please select a restaurant</p>
      <Dropdown options={restaurants} optionType='restaurant' error={error} />
      {error && <p className='text-red-500'>Select a restaurant!</p>}
    </main>
  );
}

export default StepTwo