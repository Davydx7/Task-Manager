import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Button from './Button';

const Header = ({ title, onAdd, showAddState }) => {
  const location = useLocation();
  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === '/' && <Button color={showAddState ? 'red' : 'green'} text={showAddState ? 'Close' : 'Add'} onClick={onAdd} />}
    </header>
  );
};

// CSS in JS
// const defStyles = {
//     color: 'red',
// }

Header.defaultProps = {
  title: 'Task Tracker',
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
