
import "../styles/card.css";


const Card = (props) => {
  return (
   
    <div class="card">
      <div class="image">
        <img src={props.image} alt={props.name}/>    
      </div>
      <span class="title">{props.name}</span>
      <span class="price">{props.price}</span>
    </div>

    
  );
};

export default Card;






