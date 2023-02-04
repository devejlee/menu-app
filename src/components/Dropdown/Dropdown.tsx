import { useState } from 'react';
import { Dish } from '../../types';

interface DropdownProps {
  dishes: Dish[];
}

const Dropdown = ({ dishes }: DropdownProps) => {
  const [selectedDish, setSelectedDish] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdown = () => {
    setIsOpen((open) => !open);
  }

  return (
    <div className="relative">
      <button
        className="relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={handleDropdown}
      >
        <span>{selectedDish || 'Select a dish'}</span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg">
          <div className="rounded-md bg-white shadow-xs overflow-auto max-h-[200px]">
            <ul
              className="divide-y divide-gray-200"
              role="listbox"
              aria-labelledby="options"
            >
              {dishes.map((dish) => (
                <li
                  key={dish.id}
                  className="py-2 pl-3 pr-9 cursor-pointer hover:bg-gray-50"
                  role="option"
                  aria-selected={dish.name === selectedDish}
                  onClick={() => {
                    setSelectedDish(dish.name);
                    setIsOpen(false);
                  }}
                >
                  {dish.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
