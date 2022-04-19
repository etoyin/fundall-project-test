import React, { Component } from 'react';
import GirlImage from '../../images/girl.svg';
// import 
import NavBar from './NavBar';

export default class Home extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        const bold = {
            fontWeight: 'bold'
        };
        return (
            <div>
                <NavBar />
                <div className='homeDiv text-center'>
                    <div className='imageDiv'>
                        <img src={GirlImage} className="girlImage" />
                    </div>
                    <div className='' style={{padding: '30px'}}>
                        <h5 style={bold}>Fundall Expense Tracker</h5>
                        <h5>Mini Project Frontend</h5>
                    </div>
                    <div>
                        By Adesina Oluwatoyin
                    </div>
                </div>
                
            </div>
        )
    }
}
