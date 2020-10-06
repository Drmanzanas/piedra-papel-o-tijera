import React, { Component } from 'react';

export default class Game extends Component{
    constructor(props){
        super(props)
        this.state = {
            name : this.props.name,
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
            selected: ''
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
                </section>
            </main>
        )
    }
}

