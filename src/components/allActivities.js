import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import { Table, Icon, Button } from 'semantic-ui-react';

import { getName, getPollType, getVoterBaseLogic, getProposalsWithVotes } from '../actions/searchBarActions';
import { getAllActivities } from '../actions/allActivitiesActions';

import '../styles/tableFooter.css';
const Limit = 5;

class AllActivities extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount(){
        console.log(window.location.href, this.props.searchText)
        const queryUrl = queryString.parseUrl(window.location.href)
        if ('contract' in queryUrl.query && this.props.searchText===''){
            this.props.dispatch({type: 'SEARCH_TEXT_CHANGED', payload: queryUrl.query.contract})
            this.props.dispatch(getName(queryUrl.query.contract))
            this.props.dispatch(getPollType(queryUrl.query.contract))
            this.props.dispatch(getVoterBaseLogic(queryUrl.query.contract))
            this.props.dispatch(getProposalsWithVotes(queryUrl.query.contract))
            this.props.dispatch(getAllActivities(queryUrl.query.contract))

        }
    }

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
                    <Icon name='long arrow alternate left' onClick={()=>{
                        this.props.history.push({pathname:`/contract`, search: '?contract='+this.props.searchText})}} /> Back to the Poll
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
        currentActivityPage: globalData.allActivities.currentActivityPage,
        searchText: globalData.searchBarData.searchText
    };
}

const myConnector = connect(mapStatesToProps);

export default withRouter(myConnector(AllActivities))