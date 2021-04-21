import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            errors: ''
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            const { user } = this.props.auth;
            console.log(user);
            this.props.history.push("admin/dashboard");
        }
      }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("admin/dashboard"); // push user to dashboard when they login
        }
        
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    
    onChange = e => {
        this.setState( {[e.target.id]: e.target.value } );
    }

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
        this.props.loginUser(userData);
        //window.location.reload();
    };

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
                                <b>Login</b> below
                            </h4>

                            <p className="text-secondary">
                                Don't have an account? <Link to="/register">Register</Link>
                            </p>
                        </Col>
                    </Col>
                </Row>

                <Form noValidate onSubmit={this.onSubmit}>
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
                                invalid: errors.email || errors.emailnotfound
                            })}/>
                            <span className="text-danger">
                                {errors.email}
                                {errors.emailnotfound}
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
                        <Button style=
                                    {{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                type="submit">
                            Login
                        </Button>
                </Form>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
  
export default connect(mapStateToProps, { loginUser })(Login);