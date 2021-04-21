import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

class Landing extends Component {
    render () {
        return (
            <div className="content">
                <Row>
                    <div className="text-center">
                        <Col md={{size: 12, offset: 9}}>
                            <h4>
                                <b>Welcome</b> to {' '} 
                                <span style={{ fontFamily: "monospace" }}>CalendarConnect</span>
                            </h4>
                            
                            <p className="text-secondary">
                                To begin please either register, or login.
                            </p>

                            <br/>
                        </Col>
                        <Col md="6">
                            <Link to='/register'
                                style=
                                {{
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px"
                                }}
                                className="btn btn-primary btn-large">
                                    Register
                            </Link>
                        </Col>
                        <Col md="6">
                            <Link to='/login'
                                style=
                                {{
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px"
                                }}
                                className="btn btn-light btn-large">
                                    Login
                            </Link>
                        </Col>
                    </div>
                </Row>
            </div>
        );
    }
}

export default Landing;