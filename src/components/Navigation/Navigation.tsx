import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul className="flex flex-wrap space-x-2">
        {[
          ['Step 1', '/'],
          ['Step 2', '/step-two'],
          ['Step 3', '/step-three'],
          ['Step 4', '/step-four'],
        ].map(([title, url]) => (
          <li>
            <Link to={url} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation