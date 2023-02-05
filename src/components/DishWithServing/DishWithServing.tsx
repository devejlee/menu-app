import Dropdown from '../Dropdown/Dropdown';
import CustomInput from '../CustomInput/CustomInput';
import { useDishesStore } from '../../store/dishesStore';

const DishWithServing = () => {
  const dishesFilteredByRestaurants = useDishesStore(state => state.dishesFilteredByRestaurants);
  return (
    <div>
      <div>
        <p>Please select a dish</p>
        <Dropdown options={dishesFilteredByRestaurants} optionType='dish' />
      </div>
      <div>
        <p>Please enter no. of servings</p>
        <CustomInput optionType='servings' />
      </div>
    </div>
  );
};

export default DishWithServing;