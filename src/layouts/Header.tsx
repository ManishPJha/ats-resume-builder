import { Link } from 'react-router-dom';

import LoginButton from '../components/buttons/Login';

const Header = () => {
  return (
    <header className="bg-blue-500 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          ResumeCraft Pro
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/builder">Builder</Link>
            </li>
            <li>
              <Link to="/templates">Templates</Link>
            </li>
            <li>
              <Link to="/ats-tips">ATS Tips</Link>
            </li>
            <li>
              {/* <Link to="/login">Login</Link> */}
              <LoginButton />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
