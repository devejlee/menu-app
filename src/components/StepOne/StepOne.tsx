import Dropdown from '../Dropdown/Dropdown';

const StepOne = () => {
  return (
    <main className='mt-4'>
      <p>Please select a meal</p>
      <Dropdown options={['breakfast', 'lunch', 'dinner']} optionType='meal' />
    </main>
  );
}

export default StepOne