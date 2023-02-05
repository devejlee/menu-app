import Dropdown from '../Dropdown/Dropdown';
import CustomInput from '../CustomInput/CustomInput';
import { Meal } from '../../types';

const StepOne = () => {
  const meals: Meal[] = ['breakfast', 'lunch', 'dinner'];

  return (
    <main className='mt-4'>
      <p>Please select a meal</p>
      <Dropdown options={meals} optionType='meal' />
      <p className='mt-4'>Please enter the number of people</p>
      <CustomInput optionType='people' />
    </main>
  );
};

export default StepOne;