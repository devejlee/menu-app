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
  const selectedDishes = useDishesStore(state => state.selectedDishes);
  const dishesFilteredBySelectedDishes = dishesFilteredByRestaurants.filter(dish => !selectedDishes.some(selectedDish => dish.id === selectedDish.id));

  const disabled = id !== null;

  if (dishesFilteredBySelectedDishes.length === 0 && id === null) {
    return (
      <p className='flex justify-center'>No more options</p>
    );
  }

  return (
    <div className='flex flex-col mt-4 md:flex-row md:items-center'>
      <div className='flex-grow md:mr-4'>
        {!disabled && <p>Please select a dish</p>}
        <Dropdown options={dishesFilteredBySelectedDishes} optionType='dish' id={id} name={name} disabled={disabled} />
      </div>
      <div>
        {!disabled && <p>Please enter no. of servings</p>}
        <CustomInput optionType='servings' id={id} servings={servings} disabled={disabled} />
      </div>
    </div>
  );
};

export default DishWithServing;