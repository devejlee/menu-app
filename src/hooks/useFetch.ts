import { useEffect, useState } from "react";
import { Dish, DishesState } from '../types';

const useFetch = (url: string) => {
  const [data, setData] = useState<Dish[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(url);
        if (!response.ok) {
          const message = `An error has occured: ${response.status}`;
          setError(message)
          throw new Error(message);
        }
        const data = await response.json() as DishesState;
        setData(data.dishes);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false)
      }
    };
    fetchData();
  }, [url]);

  return {
    data,
    isLoading,
    error
  };
};

export default useFetch;
