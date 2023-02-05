import Dropdown from '../Dropdown/Dropdown';
import CustomInput from '../CustomInput/CustomInput';
import { useDishesStore } from '../../store/dishesStore';

interface DishWithServingProps {
  id: number | null;
  name: string | null;
  servings: number;
}

const DishWithServing = ({ id, name, servings }: DishWithServingProps) => {
  const dishesFilteredByRestaurants = useDishesStore(state => state.dishesFilteredByRestaurants);
  return (
    <div className='flex flex-col mt-10 md:flex-row md:items-center'>
      <div className='md:mr-4'>
        <p>Please select a dish</p>
        <Dropdown options={dishesFilteredByRestaurants} optionType='dish' id={id} name={name} />
      </div>
      <div>
        <p>Please enter no. of servings</p>
        <CustomInput optionType='servings' id={id} servings={servings} />
      </div>
    </div>
  );
};

export default DishWithServing;