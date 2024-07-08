//CSS
import "../Button/Button.css";

function Button(props){
    return(
        <button className={`${props.className ? props.className : ''}`} onClick={props.onClick} value={props.value}>{props.content}</button>
    )
}
export default Button;