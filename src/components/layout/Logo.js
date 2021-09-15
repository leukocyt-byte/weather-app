import logo from './sun_logo.png';
import './logo.css';

const Logo = () => {
  return (
    <div className="logo">
      <h1>The weather app <img src={logo} alt="sun" style={{ width: '50px' }} />
      </h1>
    </div>
  );
};

export default Logo;
