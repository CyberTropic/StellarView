import React, { Component } from "react";
import axios from "axios";
import Modal from "react-modal";
import backgroundImage from "./style/Media/loginModalPlain.svg";
import { AuthConsumer } from "./AuthContext";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import Register from "./Register";
import formError from "./style/Media/formError.svg";
import formSuccess from "./style/Media/formSuccess.svg";

Modal.setAppElement("#root");
class BaseReportPark extends Component {
	state = {
		reportIssue: "",
		errorDB: false,
		modalIsOpen: false,
		reportSuccess: false
	};

	openModal = () => {
		this.setState({ ...this.state, modalIsOpen: true });
	};

	afterOpenModal = () => {
		document.body.style.overflow = "hidden"; //Prevents background scrolling
	};

	closeModal = () => {
		console.log("Closing login modal");
		this.props.refreshInfoModal();
		this.setState({ ...this.state, modalIsOpen: false, errorDB: false });
		document.body.style.overflow = "visible";
	};

	handleEmailChange = changeEvent => {
		this.setState({
			userEmail: changeEvent.target.value
		});
	};

	handlePasswordChange = changeEvent => {
		this.setState({
			userPassword: changeEvent.target.value
		});
	};

	handleErrorAlert = () => {
		this.setState({
			errorDB: true
		});
	};

	errorMsg() {
		if (this.state.errorDB) {
			return (
				<AlertStyle success={false}>
					<img src={formError} />
					<div className="AlertText">
						Could not submit - try again!
					</div>
				</AlertStyle>
			);
		}
		if (this.state.reportSuccess) {
			return (
				<AlertStyle success={true}>
					<img src={formSuccess} />
					<div className="AlertText">Thank you for the report!</div>
				</AlertStyle>
			);
		}
	}

	reportSuccess = () => {
		console.log("get here for some reason?");
		this.setState({ reportSuccess: true, errorDB: false });
		setTimeout(() => {
			this.closeModal();
			this.props.context.handleLogin();
			// this.props.justLoggedIn();
		}, 1250);
	};

	handleFormChange = e => {
		this.setState({
			reportIssue: e.currentTarget.value
		});
	};

	onSubmit = e => {
		e.preventDefault();
		axios
			.post("/api/reportPark", {
				params: {
					reportIssue: this.state.reportIssue,
					park_id: this.props.parkID
				}

				//add comma to add more
			})
			//this.loginSuccess() will run function automatically
			.then(this.reportSuccess)

			.catch(err => {
				console.error("ERROR OCCURRED!", err);
				this.handleErrorAlert();
				//.then(this.closemModal) is needed
			});
	};

	renderRadioForm = () => {
		return (
			<ReportFormStyle>
				<h1>What's the reason?</h1>
				<label class="container">
					Park does not exist
					<input
						type="radio"
						name="report"
						id="DNE"
						value="DNE"
						onChange={this.handleFormChange}
					/>
					<span class="checkmark"></span>
				</label>
				<label class="container">
					By-laws enforced
					<input
						type="radio"
						name="report"
						id="bylaw"
						value="bylaw"
						onChange={this.handleFormChange}
					/>
					<span class="checkmark"></span>
				</label>
				<label class="container">
					No parking
					<input
						type="radio"
						name="report"
						id="noparking"
						value="noparking"
						onChange={this.handleFormChange}
					/>
					<span class="checkmark"></span>
				</label>
				<label class="container">
					Inaccessible
					<input
						type="radio"
						name="report"
						id="inaccessible"
						value="inaccessible"
						onChange={this.handleFormChange}
					/>
					<span class="checkmark"></span>
				</label>
			</ReportFormStyle>
		);
	};

	renderReportModal = () => {
		return (
			<LoginStyle>
				<button
					type="button"
					onClick={this.closeModal}
					className="close"
					aria-label="Close"
				>
					<i class="fas fa-window-close" />
				</button>
				<div className="form">
					<div className="wrapper">
						{this.renderRadioForm()}
						{/* <div className="rowSubmit">
							<button onClick={this.onSubmit}>Submit</button>
						</div> */}
						<div className="myLocation">
							<button
								// onClick={this.getParkData.bind(this, this.state.formInput)}
								className="nearMe"
								type="button"
								onClick={this.onSubmit}
							>
								<span>SUBMIT REPORT</span>

								{/* <img src={nearMeButton} /> */}
								{/* <strong>{this.renderLocationSpinner()}</strong> */}
							</button>
						</div>
					</div>

					{this.errorMsg()}
				</div>
			</LoginStyle>
		);
	};

	//className changes model content, style gives you anything you specify to override defaults
	render() {
		return (
			<React.Fragment>
				<ReportIconStyle>
					<button onClick={() => this.openModal()}>
						<i className="reportIcon fas fa-exclamation-triangle fa-2x"></i>
					</button>
				</ReportIconStyle>

				<Modal
					closeTimeoutMS={800}
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					contentLabel="Login Modal"
					className="modal-dialog"
					style={customStyles}
				>
					<div className="modal-content">
						{this.renderReportModal()}
						{/* {this.renderModalContent()} */}
					</div>
				</Modal>
			</React.Fragment>
		);
	}
}

const ReportPark = props => (
	<AuthConsumer>
		{x => <BaseReportPark {...props} context={x} />}
	</AuthConsumer>
);

BaseReportPark.defaultProps = {
	refreshInfoModal: () => {
		console.log("Default prop!");
	}
};

export default ReportPark;

/////////////////////////////////

const customStyles = {
	overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.9)",
		transition: "opacity 400ms ease-in-out"
	},
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		padding: "0px",
		border: "none",
		borderRadius: "2.5px",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		maxWidth: "100vw",
		maxHeight: "100vh",
		overflow: "hidden"
	}
};

const LoginStyle = styled.div`
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-ms-flex-direction: column;
	flex-direction: column;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	height: 80vh;
	width: 60vw;
	position: relative;
	background: ${props => props.theme.mapBlue};
	font-family: "Lato", sans-serif;
	color: ${props => props.theme.white};
	/* min-height: 100vh; */

	.close {
		position: absolute;
		top: 0px;
		right: 0px;
		float: right;
		font-size: 2.5rem;
		font-weight: 700;
		line-height: 1;
		color: ${props => props.theme.white};
		outline: none;
		text-shadow: none;
		opacity: 0.5;
	}

	.close:hover {
		color: ${props => props.theme.colorBad};
		text-decoration: none;
	}

	.close:active {
		color: ${props => props.theme.white};
	}

	.close:not(:disabled):not(.disabled):hover,
	.close:not(:disabled):not(.disabled):focus {
		opacity: 0.75;
	}

	.myLocation {
		color: ${props => props.theme.white};
		font-size: 13px;

		.nearMe {
			all: unset;
			cursor: pointer;
			background-color: ${props => props.theme.cardLight};
			height: 36px;
			width: 100%;
			color: ${props => props.theme.prettyDark};
			transition: color 0.1s ease;

			font-size: 15px;
			font-weight: 600;

			transition: background 0.4s;
			:hover {
				background-color: ${props => props.theme.cardLightHover};

				transition: background 0s;
			}
			:active {
				background-color: ${props => props.theme.cardLightHover};
				background-size: 100%;
				transition: background 0s;
			}
		}
	}
`;

const HeaderStyle = styled.div`
	margin-left: 38%;
	color: ${props => props.theme.white};
`;

const AlertStyle = styled.div`
	position: relative;

	.AlertText {
		padding: 10px;
		background-color: ${props =>
			props.success ? "#67e8956b" : "#daa97961"};

		font-weight: 500;
	}

	img {
		padding-top: 20px;
		padding-bottom: 20px;
		width: 42px;
	}
`;

const ReportIconStyle = styled.div`
	button {
		all: unset;
		outline: none;
	}

	i {
		color: ${props => props.theme.colorMedium};
		transition: 0.25s;
		:focus,
		:hover {
			text-decoration: none;
			color: ${props => props.theme.colorMediumHover};
			transition: 0.25s;
		}
	}
`;

const ReportFormStyle = styled.div`
	position: relative;
	margin-top: 10px;
	h1 {
		padding-bottom: 20px;
		font-size: 25px;
		padding-top: 15px;
		text-align: left;
	}

	/* The container */
	.container {
		display: block;
		position: relative;
		padding-left: 40px;
		margin-bottom: 25px;
		text-align: initial;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		font-size: 20px;
	}

	/* Hide the browser's default radio button */
	.container input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
	}

	/* Create a custom radio button */
	.checkmark {
		position: absolute;
		top: 0;
		left: 0;
		height: 25px;
		width: 25px;
		background-color: ${props => props.theme.white};
		border-radius: 50%;
	}

	/* On mouse-over, add a grey background color */
	.container:hover input ~ .checkmark {
		background-color: #ccc;
	}

	/* When the radio button is checked, add a blue background */
	.container input:checked ~ .checkmark {
		background-color: ${props => props.theme.colorMedium};
	}

	/* Create the indicator (the dot/circle - hidden when not checked) */
	.checkmark:after {
		content: "";
		position: absolute;
		display: none;
	}

	/* Show the indicator (dot/circle) when checked */
	.container input:checked ~ .checkmark:after {
		display: block;
	}

	/* Style the indicator (dot/circle) */
	.container .checkmark:after {
		top: 9px;
		left: 9px;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: ${props => props.theme.white};
	}
`;
