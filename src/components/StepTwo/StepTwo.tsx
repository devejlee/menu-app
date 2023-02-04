import Dropdown from '../Dropdown/Dropdown';
import { Restaurant } from '../../types';

const StepTwo = () => {
  const restaurants: Restaurant[] = ['Mc Donalds', 'Taco Bell', 'BBQ Hut', 'Vege Deli', 'Pizzeria', 'Panda Express', 'Olive Garden'];
  return (
    <main className='mt-4'>
      <p>Please select a restaurant</p>
      <Dropdown options={restaurants} optionType='restaurant' />
    </main>
  );
}

export default StepTwo