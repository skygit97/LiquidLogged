import React from "react";
import { connect } from "react-redux";
import LoginFormContainer from "../session_form/login_form_container";
import SignupFormContainer from "../session_form/signup_form_container";
import "./modal.css";

function Modal({ modal, closeModal }) {
	if (!modal) {
		return null;
	}
	let component;
	switch (modal) {
		case "login":
			component = <LoginFormContainer />;
			break;
		case "signup":
			component = <SignupFormContainer />;
			break;
		default:
			return null;
	}
	return (
		<div className="modal-background" onClick={closeModal}>
			<div className="modal-child" onClick={(e) => e.stopPropagation()}>
				{component}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		modal: state.ui.modal,
	};
};

export default connect(mapStateToProps, null)(Modal);
