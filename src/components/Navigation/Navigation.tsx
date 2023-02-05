import { useNavigate, useLocation } from 'react-router-dom';
import { useDishesStore } from '../../store/dishesStore';
import { useEffect } from 'react';

const Navigation = () => {
  const selectedMeal = useDishesStore(state => state.selectedMeal);
  const selectedRestaurant = useDishesStore(state => state.selectedRestaurant);
  const selectedPeople = useDishesStore(state => state.selectedPeople);
  const selectedDishes = useDishesStore(state => state.selectedDishes);
  const updateShowStepOneErrors = useDishesStore(state => state.updateShowStepOneErrors);
  const updateShowStepTwoErrors = useDishesStore(state => state.updateShowStepTwoErrors);

  const navigate = useNavigate();
  const location = useLocation();

  const selectedDishesServings = selectedDishes.reduce((total, dish) => {
    return dish.id !== null ? total + dish.servings : total;
  }, 0);

  const checkSelectedMeal = () => {
    if (!selectedMeal) {
      updateShowStepOneErrors(true);
      return false;
    }
    updateShowStepOneErrors(false);
    return true;
  };

  const checkSelectedRestaurant = () => {
    if (!selectedRestaurant) {
      updateShowStepTwoErrors(true);
      return false;
    }
    updateShowStepTwoErrors(false);
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

  const steps = [
    {
      title: 'Step 1',
      url: '/',
      disabled: false
    },
    {
      title: 'Step 2',
      url: '/step-two',
      disabled: false
    },
    {
      title: 'Step 3',
      url: '/step-three',
      disabled: false
    },
    {
      title: 'Step 4',
      url: '/step-four',
      disabled: selectedPeople > selectedDishesServings
    },
  ];

  return (
    <ul className="flex flex-wrap space-x-2">
      {steps.map(step => (
        <li key={step.title}>
          <button
            onClick={() => handleNavigate(step.url)}
            className={`rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900 ${step.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={step.disabled}
          >
            {step.title}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;