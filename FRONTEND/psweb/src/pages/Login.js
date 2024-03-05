
import React, { createContext, useState } from 'react';
import '../Style/Login.css'; // Import the CSS file
import { redirect } from 'react-router-dom';
import { useEffect } from 'react';
import jwtDecode from "jwt-decode";
import { Link } from 'react-router-dom';
import CryptoJS from 'crypto-js';
// import { google } from 'google-sign-in-library'; 
import { useContext } from "react";

import axios from "axios";

const LoginForm = () => {
    const [otp, setOTP] = useState();
    const [email, setEmail] = useState(localStorage.getItem('registeredEmail') || '');
    // const storedPassword = localStorage.getItem('registeredPassword');
    // const decryptedPassword = storedPassword ? CryptoJS.AES.decrypt(storedPassword, 'secretKey').toString(CryptoJS.enc.Utf8) : '';
    const [password, setPassword] = useState(localStorage.getItem('registeredPassword') || '');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [fullname, setFullName] = useState('');
    const [showRegister, setShowRegister] = useState(false);
    const [department, setDepartment] = useState('');
   
  
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    const handleToggleRegister = () => {
        setShowRegister((prevShowRegister) => !prevShowRegister);
    };

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    };

    const handleconfirmpasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };
    
    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value);
    };
    
    // const nagigateToOtp = () => {
    //     if (email) {
    //         const OTP = Math.floor(Math.random() * 9000 + 1000);
    //         console.log(OTP);
    //         setOTP(OTP);
    
    //         fetch("http://localhost:5000/send_recovery_email", {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 OTP,
    //                 recipient_email: email
    //             })
    //         })
    //         .then(response => {
    //             if (response.ok) {
    //                 window.location.href = '/otp';
    //                 console.log('Mail sent successfully:', response.json());
    //             } else {
    //                 console.error('Failed to send mail:', response.statusText);
    //             }
    //         })
    //         .catch(error => console.error("Error sending OTP:", error));
    //     } else {
    //         alert("Please enter your email");
    //     }
    // };

    const navigateToReset = () => {
        // Check if email is provided
        if (email) {
            // Navigate to reset page with email as state
            return <Link to={{ pathname: '/reset', state: { email } }} />;
        } else {
            alert('Please enter your email');
        }
    };

    

    const handleCallbackResponse = (response) => {
        console.log("encodede JWT ID token: " + response);
        const userObject = jwtDecode(response.credential, { algorithm: 'RS256' });
        console.log(userObject);
        const { name, email } = userObject;
        fetch('http://localhost:5000/googleSignIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        })
            .then(response => {
                if (response.ok) {
                    window.location.href = '/';
                    console.log('User data stored successfully');
                    console.log('Login successful:', response.json());
                    localStorage.setItem('loggedInUserGmail',JSON.stringify(userObject));

                } else {
                    console.error('Failed to store user data:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error storing user data:', error);
            });
    };

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: "199415080611-fl5dm04msdlivid1257gu4c7njj3tq8u.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });
        window.google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        );
    }, []);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (rememberMe) {
                localStorage.setItem('registeredEmail', email);
                localStorage.setItem('registeredPassword', password);
            } else {
                localStorage.removeItem('registeredEmail');
                localStorage.removeItem('registeredPassword');
            }
            if (response.ok) {
                const user = await response.json();
                console.log('Login successful:', user);
                localStorage.setItem('loggedInUserEmail',JSON.stringify(user));
                window.location.href = '/';
                if (rememberMe) {
                    window.localStorage.setItem("isLoggedIn", true);
                }
            } else {
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const existingUser = await checkExistingUser(email);
        if (password !== confirmpassword) {
            console.error('Password and confirm password do not match');
            return;
        }
        if (existingUser) {
            console.error('Email address already exists');
            return;
        }
        try {
            // Encrypt the password using AES encryption
            // const encryptedPassword = CryptoJS.AES.encrypt(password, 'secretKey').toString();
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullname, email, password, confirmpassword }),
            });
            if (response.ok) {
                console.log('Registration successful');
                localStorage.setItem('registeredEmail', email);
                localStorage.setItem('registeredPassword', password);
                window.location.href = "/login";
            } else {
                console.error('Registration failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };
    
    const checkExistingUser = async (email) => {
        try {
            const response = await fetch(`http://localhost:5000/checkUser?email=${email}`);
            if (response.ok) {
                const data = await response.json();
                return data.exists;
            } else {
                console.error('Error checking existing user:', response.statusText);
                return false;
            }
        } catch (error) {
            console.error('Error checking existing user:', error);
            return false;
        }
    };
    return (
        <div className="wrapper">
            <div className="formBox">
                {showRegister ? (
                    <div className="leftSection">
                        <h2>Sign Up</h2>
                        <form onSubmit={handleRegisterSubmit}>
                            <div className="inputBox">
                                <input
                                    type="fullname"
                                    value={fullname}
                                    onChange={handleFullNameChange}
                                    placeholder="Full Name"
                                    className="inputField"
                                    required
                                />
                            </div>
                            <div className="inputBox">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Email"
                                    className="inputField"
                                    required
                                />
                            </div>
                            <div className="inputBox">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Password"
                                    className="inputField"
                                    name="password" // Add the name attribute
                                    id="password"
                                    required
                                />
                            </div>
                            <div className="inputBox">
                                <input
                                    type="password"
                                    value={confirmpassword}
                                    onChange={handleconfirmpasswordChange}
                                    placeholder="Confirm Password"
                                    className="inputField"
                                    required
                                />
                            </div>
                            <div className="inputBox">
                                <select onChange={handleDepartmentChange} className="inputField" required>
                                    <option value="">Select Department</option>
                                    <option value="CIVIL ENGINEERING">CIVIL ENGINEERING</option>
                                    <option value="COMPUTER SCIENCE & ENGINEERING">COMPUTER SCIENCE & ENGINEERING</option>
                                    <option value="CHEMICAL ENGINEERING">CHEMICAL ENGINEERING</option>
                                    <option value="ENVIRONMENTAL ENGINEERING & MANAGEMENT">ENVIRONMENTAL ENGINEERING & MANAGEMENT</option>
                                    <option value="ELECTRICAL ENGINEERING">ELECTRICAL ENGINEERING</option>
                                    <option value="ELECTRONICS & COMMUNICATION ENGINEERING">ELECTRONICS & COMMUNICATION ENGINEERING</option>
                                    <option value="GEO-ENGINEERING">GEO-ENGINEERING</option>
                                    <option value="INFORMATION TECHNOLOGY & COMPUTER APPLICATIONS">INFORMATION TECHNOLOGY & COMPUTER APPLICATIONS</option>
                                    <option value="INSTRUMENT TECHNOLOGY">INSTRUMENT TECHNOLOGY</option>
                                    <option value="MARINE ENGINEERING">MARINE ENGINEERING</option>
                                    <option value="MECHANICAL ENGINEERING">MECHANICAL ENGINEERING</option>
                                    <option value="METALLURGICAL ENGINEERING">METALLURGICAL ENGINEERING</option>
                                    <option value="ENGINEERING CHEMISTRY">ENGINEERING CHEMISTRY</option>
                                    <option value="HUMANITIES & BASIC SCIENCES">HUMANITIES & BASIC SCIENCES</option>
                                    <option value="APPLIED MATHEMATICS">APPLIED MATHEMATICS</option>
                                    <option value="BIOCHEMISTRY">BIOCHEMISTRY</option>
                                    <option value="BIOTECHNOLOGY">BIOTECHNOLOGY</option>
                                    <option value="BOTANY">BOTANY</option>
                                    <option value="CHEMISTRY">CHEMISTRY</option>
                                    <option value="ENVIRONMENTAL SCIENCES">ENVIRONMENTAL SCIENCES</option>
                                    <option value="FOOD,NUTRITION & DIETETICS">FOOD,NUTRITION & DIETETICS</option>
                                    <option value="GEOGRAPHY">GEOGRAPHY</option>
                                    <option value="GEOLOGY">GEOLOGY</option>
                                    <option value="GEOPHYSICS">GEOPHYSICS</option>
                                    <option value="HUMAN GENETICS">HUMAN GENETICS</option>
                                    <option value="MARINE LIVING RESOURCES">MARINE LIVING RESOURCES</option>
                                    <option value="MATHEMATICS">MATHEMATICS</option>
                                    <option value="METEOROLOGY AND OCEANOGRAPHY">METEOROLOGY AND OCEANOGRAPHY</option>
                                    <option value="MICROBIOLOGY">MICROBIOLOGY</option>
                                    <option value="NUCLEAR PHYSICS">NUCLEAR PHYSICS</option>
                                    <option value="PSYCHOLOGY & PARAPSYCHOLOGY">PSYCHOLOGY & PARAPSYCHOLOGY</option>
                                    <option value="PHYSICS">PHYSICS</option>
                                    <option value="STATISTICS">STATISTICS</option>
                                    <option value="ANTHROPOLOGY">ANTHROPOLOGY</option>
                                    <option value="COMMERCE AND MANAGEMENT STUDIES">COMMERCE AND MANAGEMENT STUDIES</option>
                                    <option value="ECONOMICS">ECONOMICS</option>
                                    <option value="EDUCATION">EDUCATION</option>
                                    <option value="ENGLISH">ENGLISH</option>
                                    <option value="FINE ARTS">FINE ARTS</option>
                                    <option value="HINDI">HINDI</option>
                                    <option value="HISTORY AND ARCHAEOLOGY">HISTORY AND ARCHAEOLOGY</option>
                                    <option value="JOURNALISM & MASS COMMUNICATION">JOURNALISM & MASS COMMUNICATION</option>
                                    <option value="LIBRARY AND INFORMATION SCIENCE">LIBRARY AND INFORMATION SCIENCE</option>
                                    <option value="MUSIC & DANCE">MUSIC & DANCE</option>
                                    <option value="PHILOSOPHY & INFORMATION SCIENCE">PHILOSOPHY & INFORMATION SCIENCE</option>
                                    <option value="PHYSICAL EDUCATION & SPORTS SCIENCES">PHYSICAL EDUCATION & SPORTS SCIENCES</option>
                                    <option value="POLITICAL SCIENCE & PUBLIC ADMINISTRATION">POLITICAL SCIENCE & PUBLIC ADMINISTRATION</option>
                                    <option value="SANSKRIT">SANSKRIT</option>
                                    <option value="SOCIAL WORK">SOCIAL WORK</option>
                                    <option value="SOCIOLOGY">SOCIOLOGY</option>
                                    <option value="TELUGU">TELUGU</option>
                                    <option value="THEATRE ARTS">THEATRE ARTS</option>
                                    <option value="YOGA & CONSCIOUSNESS">YOGA & CONSCIOUSNESS</option>
                                    <option value="ARCHITECTURE">ARCHITECTURE</option>

                                    <option value=""></option>                </select>
                            </div>
                            <button type="submit" className="btn">
                                Sign Up
                            </button>
                        </form>
                        <div className="loginRegister">
                            <p>
                                Already have an account?{' '}
                                <button onClick={handleToggleRegister} className="registerLink">
                                    Login
                                </button>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="leftSection">
                        <h2>Login</h2>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="inputBox">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Email"
                                    className="inputField"
                                    required
                                />
                            </div>
                            <div className="inputBox">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Password"
                                    className="inputField"
                                    name="password" // Add the name attribute
                                    id="password"
                                    required
                                />
                            </div>
                            <div className="rememberForgot">
                                <label>
                                    <input className='checkbox'
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={handleRememberMeChange}
                                    />
                                    Remember me
                                </label>
                                <a className="registerLink" onClick={() => (navigateToReset)}>
                                    Forgot Password?
                                </a>
                            </div>

                            <button type="submit" className="btn">
                                Login
                            </button>
                            <div className="loginRegister">
                                <p>
                                    Don't have an account?{' '}
                                    <button onClick={handleToggleRegister} className="registerLink">
                                        Sign Up
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                )}
                <div className="rightSection">
                    <img
                        src="https://cdn.discordapp.com/attachments/1205756212445192263/1207363674990313562/Dr.Palamsetty_Innovations123.png?ex=65df600b&is=65cceb0b&hm=d8811294349ee35313077b961c60da34b5a054821e87fd435d7ed27f448f3c38&"
                        style={{ width: '17%', height: 'auto', top: '43%', position: 'absolute' }}
                        alt="Your Logo Alt Text"  // Provide meaningful alt text
                    />

                    <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '80px' }}>
                              <div id='signInDiv'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;