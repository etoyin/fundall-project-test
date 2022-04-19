import {ReactComponent as Logo} from '../../logo.svg';
import GirlImage from '../../images/girl.svg';
import React, { Component } from 'react'
import {Navigate, Link} from 'react-router-dom';
// import FormErrors from '../reporter/FormError';
import FormErrors from './FormError';
import { signUp } from '../../store/action/authAction';
import { connect } from 'react-redux';


class SignUp extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            confirm_password: '',
            validPassword: false,
            validEmail: false,
            validFirstName: false,
            validLastName: false,
            validConfirmPassword: false,
            submitError: '',
            formValid: false,
            cancel: false,
            reportFormError: {
                email: '',
                password: '',
                first_name: '',
                last_name: '',
                confirm_password: '',
            },
            isLoading: false,
            isValid: false,
            redirect: false,
            validLogin: true,
            reupdate: true
        }

    }

    validateInput = (fieldName, value) => {
        let validEmail = this.state.validEmail;
        let validPassword = this.state.validPassword;
        let validFirstName = this.state.validFirstName;
        let validLastName = this.state.validLastName;
        let validConfirmPassword = this.state.validConfirmPassword;
        let reportFormError = this.state.reportFormError;
        
        switch (fieldName) {
            case 'email':
                validEmail = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                reportFormError.email = validEmail ? '': 'The Email is invalid(must be in the format abc@def.com)';
                break;
            case 'password':
                validPassword = value.length >= 6;
                reportFormError.password = validPassword ?
                    '': 'password must be 6 or more characters';
                break;
            case 'first_name':
                validFirstName = value.length > 2;
                reportFormError.first_name = validFirstName ?
                    '': 'First Name must be more than 3 characters';
                break;
            case 'last_name':
                validLastName = value.length > 2;
                reportFormError.last_name = validLastName ?
                    '': 'last Name must be more than 3 characters';
                break;
            case 'confirm_password':
                validConfirmPassword = value === this.state.password;
                reportFormError.confirm_password = validConfirmPassword ? 
                    '': 'Passwords do not match';
                break;	
            default:
                break;
        }

        this.setState({
            validPassword,
            validEmail,
            validFirstName,
            validLastName,
            validConfirmPassword,
            reportFormError
        }, this.validatePost)
    }

    validatePost = () => {
        this.setState({
            formValid: this.state.validEmail
                && this.state.validFirstName
                && this.state.validLastName
                && this.state.validPassword
                && this.state.validConfirmPassword
        })
    }

    componentDidUpdate(){
		if(this.props.response === 'Email Already in use' && this.state.reupdate){
			this.setState({
				isLoading: false,
				reupdate: false
			})
		}
	}

    handleChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name] : value
		}, () => {
			this.validateInput(name, value);
		})
	}
	
	handleSubmit = (e) => {
        e.preventDefault();
        // console.log('juilet');
        if(this.state.formValid){
            // console.log('valid');
            this.props.signUp(this.state)
        }
            
        this.setState({
            isLoading: true
        });
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
                                    <div className='error-text'>
                                        <p className='submit-error text-center'>
                                        {(response === 'Email Already in use') ? response : ''}
                                        </p>
                                    </div>
                                    <div className='error-text'>
                                        <p className='submit-error text-center'>{this.state.submitError}</p>
                                        <FormErrors formErrors={this.state.reportFormError} />                    
						            </div>

                                    <div className='row' style={{}}>
                                        <div className="col form-group">
                                            <label htmlFor="first_name">First Name</label>
                                            <input onChange={this.handleChange} name="first_name" type="text" className="form-control" id="first_name" aria-describedby="emailHelp" placeholder="Enter First name"/>
                                        </div>
                                        <div className="col form-group">
                                            <label htmlFor="last_name">Last Name</label>
                                            <input onChange={this.handleChange} name="last_name" type="text" className="form-control" id="last_name" aria-describedby="emailHelp" placeholder="Enter Last name"/>
                                        </div>
                                    </div>
                                    <div className="form-group paddingTop">
                                        <label htmlFor="email">Email address</label>
                                        <input onChange={this.handleChange} name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                                    </div>
                                    <div className="form-group paddingTop">
                                        <label htmlFor="password">Password</label>
                                        <input onChange={this.handleChange} name="password" type="password" className="form-control" id="password" placeholder="Password"/>
                                    </div>
                                    <div className="form-group paddingTop">
                                        <label htmlFor="confirm_password">Confirm Password</label>
                                        <input onChange={this.handleChange} name="confirm_password" type="password" className="form-control" id="confirm_password" placeholder="Confirm Password"/>
                                    </div>

                                    <div className="form-group paddingTop">
                                        <input type="submit" className="form-control btn btn-primary" id="submit" placeholder="Submit"/>
                                    </div>
                                </form>
                                <div className='text-center' style={{paddingTop: '10px'}}>
                                    <p style={{fontSize: '0.8rem'}}>Already have an account? <a href='/login' style={{color: '#4CE895', textDecoration: 'none'}}>Login here</a></p>
                                </div>
                            </div>
                        </div>
                        <div className='text-center' style={{paddingTop: '70px', width: '75%',}}>
                            <div style={{width: '80%', margin: 'auto'}}>
                                <p style={{fontSize: '0.8rem'}}>
                                    By clicking on Login, you agree to our <span style={{color: '#4CE895'}}>Terms Condition and Privacy Policy </span>
                                </p>
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
		signUp: (params) => {
			dispatch(signUp(params))
		}
	}
}

const mapStateToProps = (state) => {
	return{
			response: state.auth.response
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);