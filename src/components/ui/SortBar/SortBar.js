import React from "react";
//CSS
import "../SortBar/SortBar.css";

function SortBar(props){
    return(
        <select className={`${props.className ? props.className : ''}`} value={props.value} onChange={props.onChange}>
            <option value={"author"}>Author</option>
            <option value={"title"}>Title</option>
            <option value={"genre"}>Genre</option>
        </select>
    )
}
export default SortBar;