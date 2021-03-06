import PropTypes from 'prop-types';

const Button = ({ text, color, onClick }) => (
  <button type="button" onClick={onClick} style={{ backgroundColor: color }} className="btn">
    {text}
  </button>
);

Button.defaultProps = {
  color: 'steelblue',
  text: 'no text yet',
};

Button.propType = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
