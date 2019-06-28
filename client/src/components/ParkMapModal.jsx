import React, { Component } from "react";
import Modal from "react-modal";

//TODO: Move the whole MODAL to its own component
const modalStyle = {
	overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: "linear-gradient(rgba(0,0,255,0.25), rgba(255,0,0,0.75))"
	},
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		borderRadius: "25px",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)"
	}
};

class ParkMapModal extends Component {
	state = {
		modalIsOpen: false
	};

	openModal = content => {
		this.modalContent = content;
		this.setState({ ...this.state, modalIsOpen: true });
	};

	closeModal = () => {
		this.setState({ ...this.state, modalIsOpen: false });
	};

	render() {
		return (
			<Modal
				isOpen={this.state.modalIsOpen}
				// onAfterOpen={this.afterOpenModal}
				onRequestClose={this.closeModal}
				style={modalStyle}
				contentLabel="Example Modal"
			>
				{this.modalContent}
			</Modal>
		);
	}
}

export default ParkMapModal;
