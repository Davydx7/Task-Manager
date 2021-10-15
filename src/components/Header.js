import PropTypes from 'prop-types'
import Button from './Button'



const Header = ({title, onAdd, showAddState}) => {

    return (
        <header className="header">
            <h1>{title} </h1>
            <Button color={showAddState ? 'red' : 'green'} text={showAddState ? 'Close' : 'Add'} onClick={onAdd} />
        </header>
    )
}

// CSS in JS
// const defStyles = {
//     color: 'red',
// }

Header.defaultProps = {
    title : 'Task Tracker'
} 

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
