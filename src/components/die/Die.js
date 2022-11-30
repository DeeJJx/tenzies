import './Die.css';

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#fff"
  }
  return (
    <div 
    className='die'
    style={styles}
    onClick={props.handleClick}
    >
        {props.value}
    </div>
  );
}

export default Die;
