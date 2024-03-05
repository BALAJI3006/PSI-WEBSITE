// components/ForgotPassword.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Style/ForgotPassword.css';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: '',
        };
    }
   

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email } = this.state;
    
        if (!this.isValidEmail(email)) {
            this.setState({ error: 'Please enter a valid email address.' });
            return;
        }
    
        try {
            // Make an API call to initiate the password reset process
            const response = await fetch('http://localhost:5000/forgotpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
    
            if (response.ok) {
                // Password reset request successful
                console.log('Password reset request submitted for email:', email);
                // Optionally, you can show a success message to the user
            } else {
                // Password reset request failed
                console.error('Failed to submit password reset request');
                // Optionally, you can show an error message to the user
            }
        } catch (error) {
            console.error('Error submitting password reset request:', error);
            // Optionally, you can show an error message to the user
        }
    
        // Reset state
        this.setState({ email: '', error: '' });
    };

    isValidEmail = (email) => {
        // Add your email validation logic here
        return /\S+@\S+\.\S+/.test(email);
    };

    handleChange = (e) => {
        this.setState({ email: e.target.value, error: '' });
    };

    render() {
        const { email, error } = this.state;

        return (
            <div className="container">
                <div className="topSection">
                    <h2>Forgot Password?</h2>
                </div>
                <div style={{ padding: '30px' }}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <p>Answer the security Question</p>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <div className="formGroup">
                            <label htmlFor="email" className="label">
                                where is ur birth place:
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={this.handleChange}
                                className="input"
                                required
                            />
                        </div>
                        <button type="submit" className="button">
                            <b>Send Email</b>
                        </button>
                    </form>
                    <p className="new">
                        New Here? <a style={{ color: 'green' }} href='#'><b>Sign Up</b></a>
                    </p>
                </div>
            </div>
        );
    }
}

ForgotPassword.propTypes = {
    // Add any necessary prop types here
};

export default ForgotPassword;
