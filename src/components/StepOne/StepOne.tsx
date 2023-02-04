import { useDishesStore } from '../../store/dishesStore';
import { useEffect } from 'react';

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
      <h1>Step 1</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {(!isLoading && !error) && dishes?.map((dish: any) => {
        return (
          <p key={dish.id}>{dish.name}</p>
        )
      })}
    </main>
  );
}

export default StepOne