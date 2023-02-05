import { useNavigate } from 'react-router-dom';

interface PreviousButtonProps {
  url: string;
}

const PreviousButton = ({ url }: PreviousButtonProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(url);
  };

  return (
    <button onClick={handleClick} className='mt-20 rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900'>
      Previous
    </button>
  );
};

export default PreviousButton;
