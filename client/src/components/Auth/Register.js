import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { registerUser } from "../../actions/authActions";
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Register extends Component {
    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: '',
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("admin/dashboard");
        }
      }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm
        };

        this.props.registerUser(newUser, this.props.history);
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="container">
                <Row>
                    <Col md={{size:"8", offset:"2"}}>
                        <Link to="/" className="btn btn-link">
                            <i className="nc-icon nc-minimal-left">Back to Home</i>
                        </Link>

                        <Col md="12" style={{paddingLeft: "11.250px"}}>
                            <h4>
                                <b>Register</b> below
                            </h4>

                            <p className="text-secondary">
                                Already have an account? <Link to="/login">Log in</Link>
                            </p>
                        </Col>
                    </Col>
                </Row>

                <Form noValidate onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="firstName">First Name</Label>
                        <Input type="text" 
                            name="firstName" 
                            id="firstName" 
                            placeholder="First name" 
                            onChange={this.onChange}
                            value={this.state.firstName}
                            error={errors.firstName}
                            className={classnames("", {
                                invalid: errors.firstName
                            })}/>
                            <span className="text-danger">
                                {errors.firstName}
                            </span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">Last Name</Label>
                        <Input type="text" 
                            name="lastName" 
                            id="lastName" 
                            placeholder="Last name" 
                            onChange={this.onChange}
                            value={this.state.lastName}
                            error={errors.lastName}
                            className={classnames("", {
                                invalid: errors.lastName
                            })}/>
                            <span className="text-danger">
                                {errors.lastName}
                            </span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Email" 
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            className={classnames("", {
                                invalid: errors.email
                            })}/>
                            <span className="text-danger">
                                {errors.email}
                            </span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Password" 
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            className={classnames("", {
                                invalid: errors.password || errors.passwordincorrect
                            })}/>
                            <span className="text-danger">
                                {errors.password}
                                {errors.passwordincorrect}
                            </span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="passwordConfirm">Password</Label>
                        <Input type="password" 
                            name="passwordConfirm" 
                            id="passwordConfirm" 
                            placeholder="Re-type password" 
                            onChange={this.onChange}
                            value={this.state.passwordConfirm}
                            error={errors.passwordConfirm}
                            className={classnames("", {
                                invalid: errors.passwordConfirm
                            })}/>
                            <span className="text-danger">
                                {errors.password}
                            </span>
                    </FormGroup>
                        <Button style=
                                    {{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                type="submit">
                            Register
                        </Button>
                </Form>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));