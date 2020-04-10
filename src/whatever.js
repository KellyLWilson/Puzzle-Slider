import React from 'react';
import Board from 'board';




class Whatever extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div className="row mt-lg-5 ml-lg-5 mr-lg-5">
                {this.props.tiles.map((item, index) => {
                    return (<div key={index} className="col-3 p-5 border border-dark" onClick={this.handleClick}> {item.id} </div>)
}
)}

            </div>
        )
    }
}

export default Whatever ;