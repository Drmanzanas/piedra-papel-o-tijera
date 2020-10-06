import React, { Component } from 'react';
import './Selection.css'

export default class Selection extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <section className='selection'>
                <img src={this.props.weapon.img} alt={this.props.weapon.name} className='selection-img'/>
                <p>{this.props.weapon.name}</p>
            </section>
        )
    }

}