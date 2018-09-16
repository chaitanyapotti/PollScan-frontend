import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import { Table, Icon, Button } from 'semantic-ui-react';

import '../styles/tableFooter.css';
const Limit = 5;

class AllActivities extends Component {
    addPageNumbers() {
        return <Table.Footer>
            <Table.Row key={10000000}>
                <Table.HeaderCell colSpan='5'>
                    {/*You can change the css by looking into the corresponding classes in the css file */}
                    <ReactPaginate previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={<a href="">...</a>}
                        breakClassName={"BreakView"}
                        pageCount={Math.ceil((this.props.allActivities.length) / Limit)}
                        initialPage={this.props.currentActivityPage}
                        forcePage={this.props.currentActivityPage}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={
                            (data) => {
                                this.props.dispatch({ type: 'ACTIVITIES_PAGE_CHANGED', payload: parseInt(data.selected) });
                            }}
                        containerClassName={"pagination"}
                        subContainerClassName={"paginationPage"}
                        activeClassName={"active"} />
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    }

    addTableRowsDynamically() {
        if (this.props.allActivities.length > 0) {
            return this.props.allActivities.slice((this.props.currentActivityPage) * Limit, (this.props.currentActivityPage + 1) * Limit).map((voter, index) => {
                return <Table.Row
                    key={index}>
                    <Table.Cell>{voter.address}</Table.Cell>
                    <Table.Cell>{voter.type}</Table.Cell>
                    <Table.Cell>{voter.datetime}</Table.Cell>
                    <Table.Cell>{voter.weight}</Table.Cell>
                    <Table.Cell>{voter.value}</Table.Cell>
                </Table.Row>
            })
        }
    }

    render() {
        return (
            <div>
                <span>
                    <Icon name='long arrow alternate left' /> Back to the Poll
                </span>

                <h4>Activity Log</h4>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Type</Table.HeaderCell>
                            <Table.HeaderCell>Transaction Date & Time</Table.HeaderCell>
                            <Table.HeaderCell>Size</Table.HeaderCell>
                            <Table.HeaderCell>Value</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {/* {this.addTableRows()} */}
                    <Table.Body>
                        {this.addTableRowsDynamically()}
                    </Table.Body>
                    {(Math.ceil(this.props.allActivities.length / Limit) > 1.0) ? this.addPageNumbers() : null}
                </Table>
                <Button>Download CSV</Button>
            </div>
        )
    }
}

function mapStatesToProps(globalData) {
    return {
        allActivities: globalData.allActivities.allActivities,
        currentActivityPage: globalData.allActivities.currentActivityPage
    };
}

const myConnector = connect(mapStatesToProps);

export default myConnector(AllActivities)