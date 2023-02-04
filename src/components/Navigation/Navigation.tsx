import { useNavigate, useLocation } from 'react-router-dom';
import { useDishesStore } from '../../store/dishesStore';
import { useEffect } from 'react';

const Navigation = () => {
  const selectedMeal = useDishesStore(state => state.selectedMeal);
  const selectedRestaurant = useDishesStore(state => state.selectedRestaurant);
  const updateShowStepOneErrors = useDishesStore(state => state.updateShowStepOneErrors);
  const updateShowStepTwoErrors = useDishesStore(state => state.updateShowStepTwoErrors);

  const navigate = useNavigate();
  const location = useLocation();

  const checkSelectedMeal = () => {
    if (!selectedMeal) {
      updateShowStepOneErrors(true)
      return false;
    }
    updateShowStepOneErrors(false)
    return true;
  };

  const checkSelectedRestaurant = () => {
    if (!selectedRestaurant) {
      updateShowStepTwoErrors(true)
      return false;
    }
    updateShowStepTwoErrors(false)
    return true;
  };

  const handleNavigate = (url: string) => {
    if (url !== '/') {
      if (!checkSelectedMeal()) {
        return;
      }
    }
    if (url !== '/' && url !== '/step-two') {
      if (!checkSelectedRestaurant()) {
        return;
      }
    }
    navigate(url);
  };

  useEffect(() => {
    if (!selectedMeal) {
      return navigate('/');
    }
    if (!selectedRestaurant && location.pathname !== '/' && location.pathname !== '/step-two') {
      return navigate('/step-two');
    }
  }, [selectedMeal, selectedRestaurant, location.pathname, navigate]);

  return (
    <nav>
      <ul className="flex flex-wrap space-x-2">
        {[
          ['Step 1', '/'],
          ['Step 2', '/step-two'],
          ['Step 3', '/step-three'],
          ['Step 4', '/step-four'],
        ].map(([title, url]) => (
          <li key={title}>
            <button onClick={() => handleNavigate(url)} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation