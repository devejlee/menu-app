import { useDishesStore } from '../../store/dishesStore';
import PreviousButton from '../PreviousButton/PreviousButton';

const StepFour = () => {
  const selectedMeal = useDishesStore(state => state.selectedMeal);
  const selectedPeople = useDishesStore(state => state.selectedPeople);
  const selectedRestaurant = useDishesStore(state => state.selectedRestaurant);
  const selectedDishes = useDishesStore(state => state.selectedDishes);
  const filteredSelectedDishes = selectedDishes.filter(dish => dish.id !== null);

  const results = {
    selectedMeal,
    selectedPeople,
    selectedRestaurant,
    selectedDishes: filteredSelectedDishes
  };

  const handleSubmit = () => {
    console.log('results', results);
  };

  return (
    <main className='mt-4'>
      <ul>
        <li>Meal: {selectedMeal}</li>
        <li>No. of people: {selectedPeople}</li>
        <li>Restaurant: {selectedRestaurant}</li>
        <li>Dishes:</li>
        <ul>
          {filteredSelectedDishes
            .map(dish => (
              <li key={dish.id}>
                {dish.name}: {dish.servings}
              </li>
            ))}
        </ul>
      </ul>
      <PreviousButton url='/step-three' />
      <button className='mt-2 ml-4 rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900' onClick={handleSubmit}>Submit</button>
    </main>
  );
};

export default StepFour;