import React from "react";
import styled from "styled-components";
import Webcam from "react-webcam";

const Overlay = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100vh;
	display: ${props => (props.show ? "flex" : "none")};
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

class WebCamOverlay extends React.Component {
  constructor(props){
    super(props);
    this.webref = React.createRef();
  }
	render() {
		return (
			<Overlay {...this.props}>
				<a href="#home" onClick={this.props.hideOverlay}>
					close
				</a>
				<Webcam height={200} width={200} ref={this.webref} />
				<button
					onClick={() => {
            const src = this.webref.current.getScreenshot();
						this.props.setSrc(src);
					}}
				>
					Click
				</button>
			</Overlay>
		);
	}
}

export default WebCamOverlay;
