import React, { useState, ChangeEvent } from 'react';
import { useDishesStore } from '../../store/dishesStore';

interface CustomInputProps {
  optionType: 'people' | 'servings'
}

const CustomInput = ({ optionType }: CustomInputProps) => {
  const [count, setCount] = useState(1);

  const selectedPeople = useDishesStore(state => state.selectedPeople);
  const selectedServings = useDishesStore(state => state.selectedServings);
  const updateSelectedPeople = useDishesStore(state => state.updateSelectedPeople);
  const updateSelectedServings = useDishesStore(state => state.updateSelectedServings);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const lastCharacter = value.charAt(value.length - 1);
    const lastCharacterAsNumber = Number(lastCharacter);
    if (value === '10') {
      const numberValue = Number(value);
      setCount(numberValue);
      if (optionType === 'people') {
        updateSelectedPeople(numberValue);
      } else if (optionType === 'servings') {
        updateSelectedServings(numberValue);
      }
    } else if (lastCharacterAsNumber >= 1 && lastCharacterAsNumber <= 9 && value !== '10') {
      setCount(lastCharacterAsNumber);
      if (optionType === 'people') {
        updateSelectedPeople(lastCharacterAsNumber);
      } else if (optionType === 'servings') {
        updateSelectedServings(lastCharacterAsNumber);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      setCount(1);
      if (optionType === 'people') {
        updateSelectedPeople(1);
      } else if (optionType === 'servings') {
        updateSelectedServings(1);
      }
    } else if (event.key === 'ArrowUp') {
      handleIncrement();
    } else if (event.key === 'ArrowDown') {
      handleDecrement();
    }
  };

  const handleIncrement = () => {
    setCount(count < 10 ? count + 1 : count);
    if (optionType === 'people') {
      updateSelectedPeople(selectedPeople < 10 ? selectedPeople + 1 : selectedPeople);
    } else if (optionType === 'servings') {
      updateSelectedServings(selectedServings < 10 ? selectedServings + 1 : selectedServings);
    }
  };

  const handleDecrement = () => {
    setCount(count > 1 ? count - 1 : count);
    if (optionType === 'people') {
      updateSelectedPeople(selectedPeople > 1 ? selectedPeople - 1 : selectedPeople);
    } else if (optionType === 'servings') {
      updateSelectedServings(selectedServings > 1 ? selectedServings - 1 : selectedServings);
    }
  };

  const getCount = () => {
    switch (optionType) {
      case 'people':
        return selectedPeople || count;
      case 'servings':
        return count;
      default:
        return count;
    }
  };

  return (
    <div className="relative">
      <input
        type="string"
        value={getCount()}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="border w-full border-gray-400 rounded py-2 px-4 leading-tight focus:outline-none focus:border-indigo-500 hover:border-gray-500"
      />
      <div className="absolute top-0 bottom-0 right-0 flex flex-col items-center border border-gray-400 rounded-r overflow-hidden">
        <button className="flex items-center justify-center w-full bg-gray-200 px-1 h-[50%]"
          onClick={handleIncrement}
        >
          +
        </button>
        <button
          className="flex items-center justify-center w-full bg-gray-200 px-1 h-[50%]"
          onClick={handleDecrement}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default CustomInput;
