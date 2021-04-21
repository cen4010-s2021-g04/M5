import React from 'react';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from 'reactstrap';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Tables extends React.Component {
  render() {
    return (
      <>
        <div className='content'>
          <Row>
            <Col md='12'>
              <Card>
                <CardHeader>
                  <CardTitle tag='h4'>Contacts</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className='text-primary'>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Online</th>
                        <th className='text-right'>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dakota Ray</td>
                        <td>dray@mail.com</td>
                        <td>Online</td>
                        <td className='text-right'></td>
                      </tr>
                      <tr>
                        <td>Minerva Hooper</td>
                        <td>mhooper@mail.com</td>
                        <td>Offline</td>
                        <td className='text-right'></td>
                      </tr>
                      <tr>
                        <td>Sage Rodriguez</td>
                        <td>srodriguez@mail.com</td>
                        <td>Busy</td>
                        <td className='text-right'></td>
                      </tr>
                      <tr>
                        <td>Philip Wu</td>
                        <td>pwu@mail.com</td>
                        <td>Online </td>
                        <td className='text-right'></td>
                      </tr>
                      <tr>
                        <td>Matthew Greene</td>
                        <td>mgreene@mail.com</td>
                        <td>Away</td>
                        <td className='text-right'></td>
                      </tr>
                      <tr>
                        <td>Josh Porter</td>
                        <td>jporter@mail.com</td>
                        <td>Online</td>
                        <td className='text-right'></td>
                      </tr>
                      <tr>
                        <td>Jane Smith</td>
                        <td>jsmith@mail.com</td>
                        <td>Online</td>
                        <td className='text-right'></td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

Tables.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Tables);
