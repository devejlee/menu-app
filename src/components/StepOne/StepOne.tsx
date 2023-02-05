import Dropdown from '../Dropdown/Dropdown';
import PeopleInput from '../PeopleInput/PeopleInput';
import { Meal } from '../../types';
import { useDishesStore } from '../../store/dishesStore';

const StepOne = () => {
  const showStepOneErrors = useDishesStore(state => state.showStepOneErrors);
  const selectedMeal = useDishesStore(state => state.selectedMeal);

  const meals: Meal[] = ['breakfast', 'lunch', 'dinner'];
  const error = !selectedMeal && showStepOneErrors;

  return (
    <main className='mt-4'>
      <p>Please select a meal</p>
      <Dropdown options={meals} optionType='meal' error={error} />
      {error && <p className='text-red-500'>Select a meal!</p>}
      <p className='mt-4'>Please enter the number of people</p>
      <PeopleInput />
    </main>
  );
};

export default StepOne;