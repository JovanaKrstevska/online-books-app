//CSS
import "../Button/Button.css";

function Button(props){
    const buttonClass = `button ${props.modifier ? `button--${props.modifier}` : ''} ${props.className ? props.className : ''}`;
    return(
        <button className={buttonClass} onClick={props.onClick} value={props.value}>{props.content}</button>
    )
}
export default Button;