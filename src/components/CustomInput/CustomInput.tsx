import React, { useState, ChangeEvent } from 'react';
import { useDishesStore } from '../../store/dishesStore';

interface CustomInputProps {
  optionType: 'people' | 'servings'
}

const CustomInput = ({ optionType }: CustomInputProps) => {
  const [count, setCount] = useState(1);

  const selectedPeople = useDishesStore(state => state.selectedPeople);
  const updateSelectedPeople = useDishesStore(state => state.updateSelectedPeople);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const lastCharacter = value.charAt(value.length - 1);
    const lastCharacterAsNumber = Number(lastCharacter);
    if (value === '10') {
      const numberValue = Number(value);
      setCount(numberValue);
      if (optionType === 'people') {
        updateSelectedPeople(numberValue);
      }
    } else if (lastCharacterAsNumber >= 1 && lastCharacterAsNumber <= 9 && value !== '10') {
      if (optionType === 'people') {
        setCount(lastCharacterAsNumber);
        updateSelectedPeople(lastCharacterAsNumber);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      setCount(1);
      if (optionType === 'people') {
        updateSelectedPeople(1);
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
    }
  };

  const handleDecrement = () => {
    setCount(count > 1 ? count - 1 : count);
    if (optionType === 'people') {
      updateSelectedPeople(selectedPeople > 1 ? selectedPeople - 1 : selectedPeople);
    }
  };

  return (
    <div className="relative">
      <input
        type="string"
        value={optionType === 'people' ? selectedPeople : count}
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
