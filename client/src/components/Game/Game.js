import React, { Component } from 'react';
import './Game.css'

export default class Game extends Component{
    constructor(props){
        super(props)
        this.state = {
            weapons : [
                {
                    name: 'Piedra',
                    img: '/images/piedra.png'
                },
                {
                    name: 'Papel',
                    img: '/images/papel.png'
                },
                {
                    name: 'Tijeras',
                    img: '/images/tijera.jpeg'
                }
            ],
            selected: '',
            class: 'red'
        }
    }

    changeColor(){
        if(this.state.class === 'red'){
            this.setState({
                ...this.state,
                class: 'blue'
            })
        }else{
            this.setState({
                ...this.state,
                class: 'red'
            })
        }
    }
    render(){
        return(
            <main className='game'>
                <section className='game-weapons'>
                    {this.state.weapons.map((e,i) => <figure className='weapons' key={i}>
                        <img src={e.img} alt={e.name} className='weapons-img' />
                        <figcaption>{e.name}</figcaption>
                    </figure>)}
                    <button className={this.state.class} onClick={this.changeColor.bind(this)}>{this.props.name}</button>
                </section>
            </main>
        )
    }
}

