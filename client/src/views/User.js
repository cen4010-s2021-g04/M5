import React from 'react';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from 'reactstrap';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class User extends React.Component {
  render() {
    // const { user } = this.props.auth;
    return (
      <>
        <div className='content'>
          <Row>
            <Col md='12'>
              <Card className='card-user'>
                <CardHeader>
                  <CardTitle tag='h5'>Edit Profile</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className='pr-1' md='6'>
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            defaultValue='User first name'
                            placeholder='Company'
                            type='text'
                          />
                        </FormGroup>
                      </Col>
                      <Col className='pl-1' md='6'>
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            defaultValue='User last name'
                            placeholder='Last Name'
                            type='text'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-1' md='12'>
                        <FormGroup>
                          <label htmlFor='user-email'>
                            Email address
                          </label>
                          <Input placeholder='Email' type='email' />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-1' md='6'>
                        <FormGroup>
                          <label>Password</label>
                          <Input
                            placeholder='Update password'
                            type='text'
                          />
                        </FormGroup>
                      </Col>
                      <Col className='pl-1' md='6'>
                        <FormGroup>
                          <label>Confirm Password</label>
                          <Input
                            placeholder='Confirm updated password'
                            type='text'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <div className='update ml-auto mr-auto'>
                        <Button
                          className='btn-round'
                          color='primary'
                          type='submit'
                        >
                          Update Profile
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

User.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(User);
