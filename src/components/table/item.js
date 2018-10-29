import React from "react";
import moment from "moment";

const Item = props => {
	return (
			<tr>
				<th>{props.item.name}</th>
				<th>{props.item.meetType}</th>
        <th>
          <img src={`http://10.10.10.1:7777/static/${props.item.img}`} alt=""/>
        </th>
				<th>{props.item.toMeet}</th>
				<th>{moment(props.item.inTime).format("HH:mm DD/MM/YYYY")}</th>
				<th>{props.item.reason}</th>
				<th>{props.item.idProof}</th>
				<th>{props.item.idProofNumber}</th>
				<th>{props.item.hasVehicle ? "Yes": "No"}</th>
				<th>{props.item.hasVehicle ? `${props.item.vechicalNumber}` : "N.A"}</th>
			</tr>
	);
};

export default Item;