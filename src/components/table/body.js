import React from "react";
import Item from "./item";

const Body = props => {
	return (
		<tbody>
      {props.items.map(item=>{
        return (
          <Item key={item.id} item={item} />
        )
      })}
    </tbody>
	);
};

export default Body;