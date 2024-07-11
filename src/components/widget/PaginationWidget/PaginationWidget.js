import "../PaginationWidget/PaginationWidget.css";

function PaginationWidget(props){
    return(
        <div className={`paginationControls ${props.className ? props.className : ''}`}>
                <button className="button" onClick={props.previous} disabled={props.disabled1}>Previous</button>
                <span>{props.page}</span>
                <button className="button" onClick={props.next} disabled={props.disabled2}>Next</button>
            </div>
    )
}
export default PaginationWidget;
