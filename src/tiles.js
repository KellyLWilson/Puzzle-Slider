import React from 'react';
import Board from './board.js';

class Tiles extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div className="row mt-md-5 ml-md-5 mr-md-5">
                {this.props.tiles.map((item, index) => {
                    var classStr = "col-md-3 p-5 border border-dark " + item.type;
                    return (<div
                        id={this.props.tiles.id}
                        onClick={() => { this.props.moveTile(item.location, item.type) }}
                        key={index} className={classStr}>
                        {item.currentPosition}
                    </div>)
                }
                )}
            </div>
        )
    }
}

export default Tiles;
