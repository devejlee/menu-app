import Dropdown from '../Dropdown/Dropdown';
import { useDishesStore } from '../../store/dishesStore';

const DishWithServing = () => {
  const dishesFilteredByRestaurants = useDishesStore(state => state.dishesFilteredByRestaurants);
  return (
    <div>
      <div>
        <p>Please select a dish</p>
        <Dropdown options={dishesFilteredByRestaurants} optionType='dish' />
      </div>
    </div>
  );
};

export default DishWithServing;