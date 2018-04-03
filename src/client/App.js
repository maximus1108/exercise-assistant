import React, { Component } from 'react';
import pic from './Random.png';
import vid from './viddy.mp4'

class App extends Component {
    render () {
        console.log('rendering new')
        return (
            <div>
                <header>Header Newest webpack3</header>
                <img src={pic} />
                <video>
                    <source src={vid}></source>
                </video>
            </div>
        )
    }
}

export default App;