import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root'
import Players from './Components/Players';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBaseballBall } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faBaseballBall)

class App extends Component {
    render() {
        return (
            <div id="app">
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a className="navbar-brand" href="/">Sc<FontAwesomeIcon icon="baseball-ball" size="xs"/>ut</a>
                </nav>
                <Players />
            </div>
        );
    }
}

export default hot(App);
