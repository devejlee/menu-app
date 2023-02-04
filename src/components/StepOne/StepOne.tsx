import Dropdown from '../Dropdown/Dropdown';
import { Meal } from '../../types';

const StepOne = () => {
  const meals: Meal[] = ['breakfast', 'lunch', 'dinner'];
  return (
    <main className='mt-4'>
      <p>Please select a meal</p>
      <Dropdown options={meals} optionType='meal' />
    </main>
  );
}

export default StepOne