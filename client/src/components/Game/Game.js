import React, { Component } from 'react';
import './Game.css'

import Selection from '../Selection/Selection'

export default class Game extends Component{
    constructor(props){
        super(props)
        this.state = {
            weapons : [
                {
                    name: 'Piedra',
                    img: '/images/piedra.png',
                    id: 1
                },
                {
                    name: 'Papel',
                    img: '/images/papel.png',
                    id: 2
                },
                {
                    name: 'Tijeras',
                    img: '/images/tijera.jpeg',
                    id: 3
                }
            ],
            selected: false,
            selection: '',
            bot: false
        }
    }

    componentDidMount(){
        if(this.props.isBot)
            this.setState({
                ...this.state,
                bot: true
            })
    }

    componentDidUpdate(prevP,prevS){
        if(this.state.bot && this.props.botChoose){
            this.botSelect()
            this.props.setUndefined(undefined)
        }
        if(!this.state.bot && prevS.selection !== this.state.selection){
            this.props.selectedVal(this.state.selection.id,this.state.bot)
        }
        if(this.state.bot && this.props.eraseWeapon && this.state.selected){
            this.setState({
                selected: false,
                selection: ''
            })
        }
    }

    botSelect(){
        let random = Math.floor(Math.random() * 3 )
        this.setState({
            ...this.state,
            selection: this.state.weapons[random]
        })
        setTimeout(() => {
            this.props.selectedVal(this.state.selection.id,this.state.bot)
            this.setState({
                ...this.state,
                selected: true
            })
        }, 3000)
    }

    selectWeapon(val){
        this.setState({
            ...this.state,
            selected: true,
            selection: this.state.weapons[val],
        })
        
        this.props.chosen(true)
    }

    render(){
        return(
            <main className='game'>
                <section className='game-weapons'>
                    {!this.state.bot ? this.state.weapons.map((e,i) => <figure className='weapons' key={i} onClick={() => this.selectWeapon(i)}>
                        <img src={e.img} alt={e.name} className='weapons-img' />
                        <figcaption>{e.name}</figcaption>
                    </figure>) : this.state.weapons.map((e,i) => <figure className='weapons' key={i}>
                        <img src={e.img} alt={e.name} className='weapons-img' />
                        <figcaption>{e.name}</figcaption>
                    </figure>)}
                </section>
                
                {this.state.selected ? <Selection weapon={this.state.selection} /> : <div className='not-selected'></div>}
                <section className='player'>
                    <p className='player-name'>Jugador: {this.props.name}</p>
                </section>
            </main>
        )
    }
}

