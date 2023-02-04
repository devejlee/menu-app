import { useDishesStore } from '../../store/dishesStore';
import { useEffect } from 'react';
import Dropdown from '../Dropdown/Dropdown';

const StepOne = () => {
  const dishes = useDishesStore(state => state.dishes)
  const isLoading = useDishesStore(state => state.isLoading)
  const error = useDishesStore(state => state.error)
  const fetchDishes = useDishesStore(state => state.fetchDishes)

  useEffect(() => {
    fetchDishes()
  }, [fetchDishes])

  return (
    <main className='mt-4'>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <p>Please select a meal</p>
      {(!isLoading && !error) && <Dropdown dishes={dishes} />}
    </main>
  );
}

export default StepOne