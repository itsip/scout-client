import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import ReactTable from 'react-table'
import { getColumnWidth } from './../Utils/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Players extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            isLoading: true
        };
    }

    componentDidMount() {
        this.getPlayers();
    }

    getPlayers() {
        axios.get('http://localhost:3000/players')
            .then(response => {
                this.setState({
                    players: response.data,
                    isLoading: false
                });
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className="container h-100-header">
                    <div className="row h-100-header justify-content-center align-items-center">
                        <FontAwesomeIcon icon="baseball-ball" size="3x" spin />
                    </div>
                </div>
            );
        } 

        const cell = row => (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#dadada",
                    borderRadius: "2px"
                }}
            >
                <div
                    style={{
                        width: `${row.value}%`,
                        height: "100%",
                        backgroundColor:
                        !row.value
                        ? "#dadada"
                        : row.value > 66
                        ? "#85cc00"
                        : row.value > 33
                        ? "#ffbf00"
                        : "#ff2e00",
                        borderRadius: "2px",
                        transition: "all .2s ease-out",
                        textAlign: "center",
                        color: "#ffffff"
                    }}
                >
                    {row.value}
                </div>
            </div>
        );

        let columns = [{
            Header: 'Name',
            accessor: 'name',
            width: getColumnWidth(this.state.players, 'name', 'Name'),
        }, {
            Header: 'Overall',
            accessor: 'overall',
            Cell: cell
        }];

        for (let i = 2018; i > 1998; i--) {
            columns.push({
                Header: i.toString(),
                accessor: 'years.' + i.toString() + '.score',
                Cell: cell
            });
        }

        return (
            <ReactTable
                className="container-fluid h-100-header"
                data={this.state.players}
                columns={columns}
                defaultSortDesc={true}
                filterable={true}
            />
        );
    }
}

export default Players;
