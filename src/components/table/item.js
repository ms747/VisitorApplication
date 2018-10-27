import React from "react";
import moment from "moment";

const Item = props => {
	return (
			<tr>
				<th>{props.item.name}</th>
        <th>
          <img src={`http://localhost:7777/static/${props.item.img}`} alt=""/>
        </th>
				<th>{props.item.toMeet}</th>
				<th>{moment(props.item.inTime).format("HH:mm DD/MM/YYYY")}</th>
				<th>{props.item.reason}</th>
			</tr>
	);
};

export default Item;