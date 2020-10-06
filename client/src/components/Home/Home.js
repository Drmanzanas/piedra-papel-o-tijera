import React, { Component } from 'react';
import './Home.css';

import Game from '../Game/Game';

class Home extends Component{
    constructor(){
        super()
        this.state = {
            start: false,
            name: '',
            error: true
        }
    }

    startGame(){
        this.setState({
            ...this.state,
            start: true,
        })
    }

    putName(e){
        let name = e.target.value
        if(e.target.value.length > 0){
            this.setState({
                ...this.state,
                name,
                error: false
            })
        }else{
            this.setState({
                ...this.state,
                error: true
            })
        }
    }
    render(){
        return(
            <div className='Home'>
                <h1>Piedra, Papel o Tijera</h1>
                <button className='button-play' onClick={this.startGame.bind(this)}>Empezar</button> 
                {this.state.start ? <input type='text' id='name' name='player_name'  placeholder='Elige tu nombre' onChange={this.putName.bind(this)}/> : ''}
                {this.state.error && this.state.start ? <p className='error'>Tienes que elegir un nombre antes de comenzar</p> : ''}
                <Game />
            </div>
        )
    }
}


export default Home
