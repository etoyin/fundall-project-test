import {ReactComponent as Logo} from '../../logo.svg';
import GirlImage from '../../images/girl.svg';
import React, { Component } from 'react';
import { login } from '../../store/action/authAction';
import {Navigate, Link} from 'react-router-dom';
import { connect } from 'react-redux';

class Login extends Component {

    constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			errorMessage: '',
			isLoading: false,
			isValid: false,
			redirect: false,
			validLogin: true,
			cancle: false,
			reupdate: true
		}
	}

	componentDidMount(){
		const {response} = this.props;
		if(response !== ''){
			this.setState({
				isLoading: false
			});
		}
	}
	componentDidUpdate(){
		if(this.props.response.message && this.state.reupdate){
			this.setState({
				isLoading: false,
				reupdate: false
			})
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name] : e.target.value
		})
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.login(this.state);
		this.setState({
			isLoading: true
		})
	}
	toHome = () => {
		this.setState({
			cancel: true
		})
	}

    render() {
        const formDiv = {
            width: '75%',
            height: '400px',
            borderRadius: '5px',
            backgroundColor: 'white',
            boxShadow: '',
            position: 'relative',
            top: '50px'
        }
        const { response } = this.props;
        if(response.success.user && this.state.validLogin){
            const localStorageNotUndefined = localStorage.getItem('response') !== undefined;
            if (localStorageNotUndefined) {return <Navigate to='/dashboard' />}
		}
        return (
            <div className='row'>
                <div style={{padding: '30px 0 0 100px'}} className='col'>
                    <div >
                        <Logo />
                    </div>
                    <div >
                        <div style={{marginTop: '20px', width: '150px', margin: 'auto'}} className=''>
                            <img src={GirlImage} className="girlImage" />
                        </div>
                        <div className='' style={{padding: '30px', width: '350px', margin: 'auto'}}>
                            <h4><span style={{color: '#4CE895', fontWeight: 'bolder'}}>Welcome!</span> Let's get to know you.</h4>
                            <p style={{marginTop: '20px'}}>Your first step towards a better financial lifestyle starts here.</p>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div>
                        <div style={formDiv} className='formDiv'>
                            <div style={{width: '80%', margin: 'auto', paddingTop: '30px'}}>
                                <form onSubmit={this.handleSubmit}>
                                    <div class="form-group paddingTop">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                                    </div>
                                    <div class="form-group paddingTop">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                                    </div>

                                    <div class="form-group paddingTop">
                                        <input type="submit" class="form-control btn btn-primary" id="submit" placeholder="Submit"/>
                                    </div>
                                </form>
                                <div className='text-center' style={{paddingTop: '10px'}}>
                                    <p style={{fontSize: '0.8rem'}}>Don't have an account? <a href='/sign-up' style={{color: '#4CE895', textDecoration: 'none'}}>Sign Up here</a></p>
                                </div>
                            </div>
                            <div className='text-center' style={{width: '75%', margin: 'auto'}}>
                                <div style={{width: '80%', margin: 'auto'}}>
                                    <p style={{fontSize: '0.8rem'}}>
                                        By clicking on Login, you agree to our <span style={{color: '#4CE895'}}>Terms Condition and Privacy Policy </span>
                                    </p>
                                </div>
                            
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
          )
    }
}

const mapDispatchToProps = (dispatch) => {
	return{
		login: (params) => {
			dispatch(login(params))
		}
	}
}

const mapStateToProps = (state) => {
	return{
			response: state.auth.response
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);