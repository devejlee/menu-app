import Dropdown from '../Dropdown/Dropdown';
import { useDishesStore } from '../../store/dishesStore';

const StepThree = () => {
  const dishesFilteredByRestaurants = useDishesStore(state => state.dishesFilteredByRestaurants);
  return (
    <main className='mt-4'>
      <p>Please select a dish</p>
      <Dropdown options={dishesFilteredByRestaurants} optionType='dish' />
    </main>
  );
};

export default StepThree;