import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();

  const handleNavigate = (url: string) => {
    navigate(url)
  }

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