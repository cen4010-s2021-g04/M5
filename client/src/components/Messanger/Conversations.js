import React from 'react';
import { Row, Col } from 'reactstrap';
export default function Conversations() {
    return(
        <div>
            <Row>
                <Col md='2'>
                    <div className='avatar'>
                        <img className='img-circle img-no-padding img-responsive'
                            alt='...'
                            style={{width: '2vw', height: '2vw'}}
                            src={require('assets/img/faces/kaci-baum-1.jpg')}/>
                    </div>
                </Col>
                <Col md='10'>
                    <span className='contact-title'>
                        Yuna
                    </span>
                    <p>Hello, World!</p>
                </Col>
            </Row>
        </div>
    );
}