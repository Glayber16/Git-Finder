
import "./styles.css";
function ItemList({title, description, link}) {
  return (
    <div className="itens">
        <a href={link} target="blank"><strong>{title} </strong> </a> 
        <p>{description}</p>
        <hr/>
    </div>
  )
}

export default ItemList