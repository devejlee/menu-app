import { useDishesStore } from '../../store/dishesStore';
import useFetch from '../../hooks/useFetch';
import { useEffect } from 'react';

const StepOne = () => {
  const fetchDishes = useFetch("/src/data/dishes.json");
  const dishes = useDishesStore(state => state.dishes)
  const setDishes = useDishesStore(state => state.setDishes)

  useEffect(() => {
    if (fetchDishes) {
      setDishes(fetchDishes.data)
    }
  }, [fetchDishes, setDishes])

  return (
    <main className='mt-4'>
      <h1>Step 1</h1>
    </main>
  );
}

export default StepOne