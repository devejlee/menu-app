import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Step 1</Link>
        </li>
        <li>
          <Link to="/step-two">Step 2</Link>
        </li>
        <li>
          <Link to="/step-three">Step 3</Link>
        </li>
        <li>
          <Link to="/step-four">Step 4</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation