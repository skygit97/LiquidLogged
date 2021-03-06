import React from "react";
import { withRouter } from "react-router-dom";
import "./login_form.css";

class LoginForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			errors: {},
			hidden: true,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleShow = this.toggleShow.bind(this);
		this.handleDemo = this.handleDemo.bind(this);
		this.renderErrors = this.renderErrors.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.currentUser === true) {
			this.props.history.push("/liquids");
		}

		this.setState({ errors: nextProps.errors });
	}

	update(field) {
		return (e) =>
			this.setState({
				[field]: e.currentTarget.value,
			});
	}

	handleSubmit(e) {
		e.preventDefault();

		let user = {
			username: this.state.username,
			password: this.state.password,
		};

        this.props.closeModal();
		this.props.login(user);
		this.setState({ errors: "" });
	}

	handleDemo(e) {
		e.preventDefault();
		let user = {
			username: "demousername",
			password: "demopassword",
		};

        this.props.closeModal();
		this.props.login(user);
		this.setState({ errors: "" });
	}

	toggleShow() {
		this.setState({ hidden: !this.state.hidden });
	}

	renderErrors() {
		return (
			<ul>
				{Object.keys(this.state.errors).map((error, i) => (
					<li className="errors" key={`error-${i}`}>
						{this.state.errors[error]}
					</li>
				))}
			</ul>
		);
	}

	render() {
		return (
			<div className="login-background">
				<div className="login-form-container">
					<i className="fas fa-times" onClick={this.props.closeModal} />
					<form onSubmit={this.handleSubmit}>
						<input
							type="text"
							value={this.state.username}
							onChange={this.update("username")}
							placeholder="Username"
							// required
						/>
						<br />
						<input
							type={this.state.hidden ? "password" : "text"}
							value={this.state.password}
							onChange={this.update("password")}
							placeholder="Password"
							// required
						/>
						<span className="eye-icon">
							<i
								className={this.state.hidden ? "fa fa-eye-slash" : "fa fa-eye"}
								aria-hidden="true"
								onClick={this.toggleShow}
							></i>
						</span>

						<br />
						<br />
						<button type="submit" value="Submit">
							Log In
						</button>
						<button type="submit" value="Submit" onClick={this.handleDemo}>
							Demo Login
						</button>
						{this.renderErrors()}
					</form>
				</div>
			</div>
		);
	}
}

export default withRouter(LoginForm);
