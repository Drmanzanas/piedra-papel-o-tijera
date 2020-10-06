import React, { Component } from 'react';
import './Home.css';

import Game from '../Game/Game';

class Home extends Component{
    constructor(){
        super()
        this.state = {
            start: false,
            name: '',
            error: true,
            game: false,
            bot: 'BOT',
            chosen: false,
            botSelect: undefined,
            seconds: 3,
        }
    }

    componentDidUpdate(prevP,prevS){
        if(this.state.playerWeapon !== prevS.playerWeapon){
            this.setState({
                ...this.state,
                showWinner: undefined
            })
        }

    }

    startGame(){
        if(!this.state.start)
            this.setState({
                ...this.state,
                start: true,
            })
        else if(this.state.start && !this.state.error)
            this.setState({
                ...this.state,
                game: true,
                start: false
            })
    }

    putName(e){
        let name = e.target.value
        if(e.target.value.length === 0){
            this.setState({
                ...this.state,
                name,
                error: true
            })
        }else{
            this.setState({
                ...this.state,
                name,
                error: false
            })
        }
    }

    selectedWeapon(val){
        this.setState({
            ...this.state,
            chosen: val
        })
    }

    startRound(){
        if(this.state.showWinner){
            this.setState({
                ...this.state,
                showWinner: undefined,
            })
        }
        if(this.state.chosen)
            this.setState({
                ...this.state,
                botSelect: true,
                roundStart: true
            })
        let timer = setInterval(() => {
            this.setState({
                ...this.state,
                seconds: this.state.seconds - 1
            })
        },1000)
        setTimeout(() => {
            clearInterval(timer)
            this.setState({
                ...this.state,
                seconds: 3,
                roundStart: false
            })
        },3000)
    }

    putUndefined(val){
        this.setState({
            ...this.state,
            botSelect: val
        })
    }

    compareWeapon(id,bot){
        if(bot){
            this.setState({
                ...this.state,
                botWeapon: {
                    id,
                    bot
                },
                showWinner: true
            })
        }else{
            this.setState({
                ...this.state,
                playerWeapon: {
                    id,
                    bot
                }
            })
        }
    }

    winner(){
        let botWeapon = this.state.botWeapon.id
        let playerWeapon = this.state.playerWeapon.id
        if((playerWeapon === 1 && botWeapon === 3) || (playerWeapon === 2 && botWeapon === 1) || (playerWeapon === 3 && botWeapon === 2)){
            return <p>El ganador es {this.state.name}</p>
        }else if(playerWeapon === botWeapon){
            return <p>Empate</p>
        }else{
            return <p>El ganador es BOT</p>
        }
    }

    render(){
        return(
            <div className='Home'>
                <h1>Piedra, Papel o Tijera</h1>
                {this.state.start ? <input type='text' id='name' name='player_name'  placeholder='Elige tu nombre' onChange={this.putName.bind(this)}/> : ''}
                {this.state.game ? '' : <button className='button-play' onClick={this.startGame.bind(this)}>Empezar</button> }
                {this.state.error && this.state.start ? <p className='error'>Tienes que elegir un nombre antes de comenzar</p> : ''}
                <section className='game-section'>
                    {this.state.game ? <Game name={this.state.name} isBot={false} chosen={this.selectedWeapon.bind(this)} round={this.state.botSelect !== undefined} selectedVal={this.compareWeapon.bind(this)} /> : ''}
                    {this.state.game ? <Game name={this.state.bot} isBot={true} botChoose={this.state.botSelect !== undefined} setUndefined={this.putUndefined.bind(this)} round={this.state.botSelect !== undefined} selectedVal={this.compareWeapon.bind(this)} eraseWeapon={this.state.showWinner === undefined}/> : ''}
                </section>
                { this.state.game ? <section className='timer'>
                    <p className='timer-seconds'>{this.state.seconds}</p>
                </section> : ''}
                {this.state.showWinner !== undefined ? this.winner() : ''}
                {this.state.game ? <button className='button-play' onClick={this.startRound.bind(this)}>Jugar</button> : ''}
            </div>
        )
    }
}


export default Home
