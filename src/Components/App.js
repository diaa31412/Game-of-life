import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {Grid} from './Grid';

class App extends Component {
  constructor(){
    super();

    this.speed=1000;
    this.rows=30;
    this.cols =50;
    this.state= {
      generation:0,
      gridFull: Array(this.rows).fill().map(()=>Array(this.cols).fill(false)) 

      }
  }

  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy
    });
  }




  seed = () =>{
   
     let gridCopy = arrayClone(this.state.gridFull);
     for (let i =0; i < this.rows; i++){
         for (let j=0; j< this.cols; j++){
           if(Math.floor(Math.random() * 4) ===1){
             
             gridCopy[i][j] = true;
           }
         }
     }
       this.setState({
      gridFull: gridCopy
    });
  }
   
   
   pauseButton =() =>{
     clearInterval(this.intervalId)
   }


   play =()=>{
     let g= this.state.gridFull;
     let g2=arrayClone(this.state.gridFull);
     for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < this.rows - 1) if (g[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    this.setState({
      gridFull: g2,
      generation: this.state.generation + 1
    });
   }


  playButton = () => {
    
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  }



  componentDidMount (){
    this.seed();
    this.playButton();
  }




  render() {
    return (
      <div>
       <h1>The Game Of Life</h1>
       
       <Grid
         gridFull={this.state.gridFull}
         rows={this.rows}
         cols={this.cols}
         selectBox={this.selectBox}
       />
       <h2>Generation: {this.state.generation}</h2>
        
      </div>
    );
  }
}

export default App;


function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}
