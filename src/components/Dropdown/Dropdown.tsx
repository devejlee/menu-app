import { useEffect, useState } from 'react';
import useClickAway from '../hooks/useClickAway';
import { useDishesStore } from '../../store/dishesStore';
import { Dish, Meal, Restaurant, OptionType } from '../../types';

interface DropdownProps {
  options: Dish[] | Meal[] | Restaurant[];
  optionType: OptionType;
  id?: number | null;
  name?: string | null;
  disabled?: boolean;
}

const Dropdown = ({ options, optionType, name, disabled = false }: DropdownProps) => {
  const isLoading = useDishesStore(state => state.isLoading);
  const isError = useDishesStore(state => state.error);
  const selectedMeal = useDishesStore(state => state.selectedMeal);
  const selectedRestaurant = useDishesStore(state => state.selectedRestaurant);
  const selectedServings = useDishesStore(state => state.selectedServings);
  const selectedDishes = useDishesStore(state => state.selectedDishes);
  const fetchDishes = useDishesStore(state => state.fetchDishes);
  const updateDishesFilteredByMeals = useDishesStore(state => state.updateDishesFilteredByMeals);
  const updateDishesFilteredByRestaurants = useDishesStore(state => state.updateDishesFilteredByRestaurants);
  const updateSelectedMeal = useDishesStore(state => state.updateSelectedMeal);
  const updateSelectedRestaurant = useDishesStore(state => state.updateSelectedRestaurant);
  const updateSelectedDish = useDishesStore(state => state.updateSelectedDish);
  const resetSelectedDish = useDishesStore(state => state.resetSelectedDish);
  const resetSelectedDishes = useDishesStore(state => state.resetSelectedDishes);
  const resetSelectedServings = useDishesStore(state => state.resetSelectedServings);

  const ref = useClickAway(() => {
    setIsOpen(false);
  });

  const [selected, setSelected] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdown = async () => {
    if (disabled) {
      return;
    }
    setIsOpen((open) => !open);
  };

  const handleSelect = async (optionName: string, optionId: number) => {
    setSelected(optionName);
    setIsOpen(false);
    if (optionType === 'meal') {
      updateSelectedRestaurant(null);
      resetSelectedDish();
      resetSelectedDishes();
      resetSelectedServings();
      updateSelectedMeal(optionName as Meal);
      await fetchDishes();
      updateDishesFilteredByMeals();
    } else if (optionType === 'restaurant') {
      resetSelectedDish();
      resetSelectedDishes();
      resetSelectedServings();
      updateSelectedRestaurant(optionName as Restaurant);
      updateDishesFilteredByRestaurants();
    } else if (optionType === 'dish') {
      updateSelectedDish(optionId, optionName, selectedServings);
    }
  };

  const getSelected = () => {
    switch (optionType) {
      case 'meal':
        return selectedMeal || selected || '---';
      case 'restaurant':
        return selectedRestaurant || selected || '---';
      case 'dish':
        return name || selected || '---';
      default:
        return selected || '---';
    }
  };

  useEffect(() => {
    setSelected('');
  }, [selectedDishes]);

  return (
    <div className="relative" ref={ref}>
      <button
        className={`relative w-full rounded-md border border-gray-400 bg-white pl-3 pr-10 py-2 text-left focus:border-indigo-500 hover:border-gray-500 ${disabled ? 'cursor-not-allowed' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={handleDropdown}
      >
        <span>{getSelected()}</span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="absolute z-10 right-0 mt-2 w-56 rounded-md shadow-lg">
          <div className="rounded-md bg-white shadow-xs overflow-auto max-h-[200px]">
            <ul
              className="divide-y divide-gray-200"
              role="listbox"
              aria-labelledby="options"
            >
              {isLoading && optionType === 'restaurant' ? (
                <li className='py-2 pl-3 pr-9 cursor-pointer hover:bg-gray-50'>Loading...</li>
              ) : isError && optionType === 'restaurant' ? (
                <li className='py-2 pl-3 pr-9 cursor-pointer hover:bg-gray-50'>Error fetching data</li>
              ) : options?.map((option, key) => {
                let optionName = '';
                let optionId: null | number | Meal | Restaurant = null;

                switch (optionType) {
                  case 'dish':
                    optionName = (option as Dish).name;
                    optionId = (option as Dish).id;
                    break;
                  case 'meal':
                    optionName = option as Meal;
                    optionId = option as Meal;
                    break;
                  case 'restaurant':
                    optionName = option as Restaurant;
                    optionId = option as Restaurant;
                    break;
                  default:
                    optionName = '';
                    optionId = key;
                }

                return (
                  <li
                    key={optionId}
                    className="py-2 pl-3 pr-9 cursor-pointer hover:bg-gray-50"
                    role="option"
                    aria-selected={optionName === selected}
                    onClick={() => {
                      handleSelect(optionName, optionId as number);
                    }}
                  >
                    {optionName}
                  </li>
                );
              })}

              {options.length === 0 && !isLoading && !isError && (
                <li className='py-2 pl-3 pr-9 cursor-pointer hover:bg-gray-50'>No items available!</li>
              )}

            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;