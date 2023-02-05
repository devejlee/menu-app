import Dropdown from '../Dropdown/Dropdown';
import { useDishesStore } from '../../store/dishesStore';

const StepThree = () => {
  const dishes = useDishesStore(state => state.dishes);
  return (
    <main className='mt-4'>
      <p>Please select a dish</p>
      <Dropdown options={dishes} optionType='dish' />
    </main>
  );
};

export default StepThree;