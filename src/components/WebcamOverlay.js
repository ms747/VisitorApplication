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
	z-index:9999;

	& > div {
		background:white;
		border:1px solid #ced4da;
		padding:1rem 3rem;
	}}
`;

class WebCamOverlay extends React.Component {
	constructor(props) {
		super(props);
		this.webref = React.createRef();
	}
	render() {
		return (
			<Overlay {...this.props}>
				<div>
					<div className="row">
						<h4>Take Picture</h4>
					</div>
					<div className="row">
						<Webcam height={200} width={200} ref={this.webref} screenshotFormat="image/jpeg" />
					</div>

					<div className="row">
						<button
							className="btn btn-primary"
							onClick={() => {
								const src = this.webref.current.getScreenshot();
								this.props.setSrc(src);
							}}
						>
							Click
						</button>

						<button
							className="btn btn-danger"
							onClick={this.props.hideOverlay}>
							close
						</button>
					</div>
				</div>
			</Overlay>
		);
	}
}

export default WebCamOverlay;
