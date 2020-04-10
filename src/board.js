import React from 'react';
import Tiles from './tiles.js';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tileArray: [],
            tiles: [],
            start: [],
            cClicked: [],
            //solvePuzzle: false,
        }
        this.generateGrid = this.generateGrid.bind(this)
        this.locateTile = this.locateTile.bind(this)
        this.moveTile = this.moveTile.bind(this)
        //this.newPuzzle = this.newPuzzle(this)
        this.checkWin = this.checkWin(this)
    }

    componentDidUpdate() {
        //this.checkWin()
    }

    async componentDidMount() {
        await this.generateGrid();
    }

    handleClick(e) {
        e.preventDefault();
        this.props.moveTile(e);
    }

    generateGrid() {
        // array of N elements, where N is the number of rows needed
        let tileArray = [];
        let start = [];
        let gridSize = 16;

        for (let i = 0; i < gridSize; i++) {
            let object = {
                currentPosition: i,
                winPosition: i,
                type: "regular",
                location: i,
                id: i,
                isActive: -1,
            }
            tileArray.push(object)
            start.push(object);
        }
        let bpos = this.locateTile(0, tileArray);
        tileArray[bpos].type = "blank"

        this.setState({ tiles: tileArray })
        this.setState({ start: tileArray })

    }

    //Random Function???? Which is actually a new game......
    randomTiles() {
        for (let i = 0; i < this.state.tileArray.length; i++) {

            //random of available spots i-- decreases each time  switch current pos & type define regular & type

            let random = Math.floor(Math.random() * (this.props.tileArray.length - 1))
            let randomtileArray = this.props.tileArray.splice(random, 1)
            this.props.tiles.push(randomtileArray[0])
        }
    }

    //This moves the tile - moveTile
    moveTile(indexOfClickedItem) {
        //console.log(this.state.tiles.currentPosition);       
        let tempPositions = this.state.tiles;
        let indexOfBlankItem = this.state.tiles.findIndex(i => i.currentPosition === 0);
        let blankObj = this.state.tiles[indexOfBlankItem];
        //this should be the current location of the clicked tile
        let clickedObj = this.state.tiles[indexOfClickedItem];
        console.log(clickedObj);
        //console.log(tempPositions)
        //console.log(blank)
        //console.log(indexOfBlankItem)
        //zpos & cpos WRONG!!!!
        let zpos = indexOfBlankItem;
        let cpos = indexOfClickedItem;
        //console.log(zpos)
        //console.log(cpos)
        let clickRow = parseInt((cpos) / 4);
        let clickCol = (cpos) % 4
        //console.log(clickRow)
        //console.log(clickCol)
        let blankRow = parseInt((zpos) / 4);
        let blankCol = (zpos) % 4;
        //console.log(blankRow)
        //console.log(blankCol)
        let canSwitch = false;

        if (clickRow === blankRow && Math.abs(blankCol - clickCol) === 1) {
            canSwitch = true;
        }
        else if (clickCol === blankCol && Math.abs(blankRow - clickRow) === 1) {
            canSwitch = true;
            console.log('can move');
        } else {
            canSwitch = false;
            console.log('nope');
        }

        if (canSwitch) {

            tempPositions[cpos].type = "blank";
            tempPositions[zpos].type = "regular";
            let tmp = clickedObj.currentPosition;
            //its not correct on current position......
            //console.log(tmp)
            //console.log(tempPositions)
            tempPositions[cpos].currentPosition = blankObj.currentPosition;
            tempPositions[zpos].currentPosition = tmp;
            this.setState({
                tiles: tempPositions
            })
        }
    }

    //checkWin
    //compare start to current
    checkWin(start, tiles) {
        var objectsAreSame = true;
        for (var currentPosition in start) {
            if (currentPosition[start] !== currentPosition[tiles]) {
                objectsAreSame = false;
                break;
            }
        }
        return objectsAreSame;
    }

    locateTile(p, arr) {
        let k = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].currentPosition === p) {
                k = i;
                break;
            }
        }
        return k;
    }

    render() {
        return (
            <div className="container ">
                <h3 className="text-center"> Welcome to My Puzzle Slider</h3>
                <button type="button" className="btn-primary btn-mt-md-5 ml-md-5 " onClick={this.generateGrid}>New Game - Not staying just for sanity</button>
                <button type="button" className="btn-primary btn-mt-md-5 ml-md-5 " onClick={this.randomTiles}>Start Game</button>

                <Tiles tiles={this.state.tiles} moveTile={this.moveTile} />

            </div>
        );
    }
}

export default Board;