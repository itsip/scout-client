import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getColumnWidth from '../Utils/helpers';

class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getPlayers();
  }

  getPlayers() {
    axios.get('http://localhost:3000/players')
      .then((response) => {
        this.setState({
          players: response.data,
          isLoading: false,
        });
      });
  }

  render() {
    const { isLoading, players } = this.state;

    if (isLoading) {
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
        width: '100%',
          height: '100%',
          backgroundColor: '#dadada',
          borderRadius: '2px',
      }}
      >
      <div
      style={{
        width: `${row.value}%`,
          height: '100%',
          backgroundColor:
        !row.value
          ? '#dadada'
          : row.value > 79
          ? '#85cc00'
          : row.value > 49
          ? '#ffbf00'
          : '#ff2e00',
          borderRadius: '2px',
          transition: 'all .2s ease-out',
          textAlign: 'center',
          color: '#ffffff',
      }}
      >
      {row.value}
      </div>
      </div>
    );

    const columns = [{
      Header: 'Name',
      accessor: 'name',
      width: getColumnWidth(players, 'name', 'Name'),
      filterMethod: (filter, row) => row[filter.id].toLowerCase()
      .includes(filter.value.toLowerCase()),
    }, {
      Header: 'Overall',
      accessor: 'overall',
      Cell: cell,
    }, {
      Header: 'Position',
      accessor: 'position',
      Cell: cell,
    }];

    for (let i = 2021; i >= 1954; i -= 1) {
      columns.push({
        Header: i.toString(),
        accessor: `scores.${i.toString()}`,
        Cell: cell,
      });
    }

    return (
      <ReactTable
      className="container-fluid h-100-header"
      data={players}
      columns={columns}
      defaultSortDesc
      filterable
      />
    );
  }
}

export default Players;
