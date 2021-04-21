import React, { Component, useState } from 'react';
import { Row, Col, 
    Card, CardHeader, CardBody, CardTitle, CardFooter, 
    TabContent, TabPane,
    Nav, NavItem, NavLink, 
    Button, Form, FormGroup, Input, Label, 
    ListGroup, ListGroupItem 
} from 'reactstrap';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Conversations from 'components/Messanger/Conversations';

function Messages() {
    // const { user } = this.props.auth;

    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (    
        <div className='content'>
            <Nav tabs>
                <NavItem>
                    <NavLink className={classNames({ active: activeTab === '1 '})}
                        onClick={() => { toggle('1'); }} >
                            Conversations
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classNames({ active: activeTab === '2'})}
                        onClick={() => {toggle('2'); }}>
                            Contacts
                        </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                    <Row>
                        <Col md='3'>
                            <ListGroup>
                                <ListGroupItem>
                                    <Conversations/>
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col md='9'>
                            <Card>
                                <CardHeader>
                                    <CardTitle tag='h5' style={{textAlign: 'center'}}>Chatting with...</CardTitle>
                                    <p className='card-category' style={{textAlign: 'center'}}>Online</p>
                                </CardHeader>
                                <CardBody>
                                    <div className='convo-card'>
                                        <table>
                                            <tbody>
                                                    Messages...
                                            </tbody>
                                        </table>
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    <Form>
                                        <FormGroup>
                                            <Row>
                                                <Col md='9'>
                                                    <Label for='text'>Type Message</Label>
                                                    <Input type='textarea' name='text' id='text'/>
                                                </Col>
                                                <Col md='3'>
                                                    <Button style={{marginTop: '6.1rem'}}>
                                                        Send
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                    </Form>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId='2'>
                    <Row>
                        <Col sm='12'>
                            Contacts Page...
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>
    );
}

Messages.propTypes = {
    auth: PropTypes.object.isRequired,
};
  
const mapStateToProps = state => ({
    auth: state.auth,
});
  
export default connect(mapStateToProps)(Messages);