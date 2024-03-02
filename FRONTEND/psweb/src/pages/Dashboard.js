import React from 'react';
import "../Style/contactus.css";
import "../Style/Dashboard.css";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../Style/scrollbar.css';


const ContactUs = () => {
    const handleFileInputChange = (event) => {
        const files = event.target.files;
        console.log(files);
        // Do something with the selected file(s)
    };

    return (
        <div className="appDash">
            <NavBar />

            <div className='mainpart'>
                <div className='SidePane'>
                    <div className='UserDetails'>
                        <div className='imgPart'>
                        </div>
                        <h2>Username</h2>
                        <p>Student</p>
                    </div>
                    <div className='userDetails1'>
                        <div className='sidePaneDetails'>
                            <img src="https://cdn.discordapp.com/attachments/1205756212445192263/1209041969045704714/Frame-2.png?ex=65e57b14&is=65d30614&hm=aba3d96bcf47f9eac8cd2147b7278889feec7f33d79e4877ec9a05999083566c&" alt="Image" />
                            <p>My Profile</p></div>
                        <div className='sidePaneDetails'>
                            <img src="https://cdn.discordapp.com/attachments/1205756212445192263/1209041969397891132/Frame-3.png?ex=65e57b14&is=65d30614&hm=3fc927ab62c485bb91b521105194ad747b19a4d3036610435f4ea737451c6d8d&" alt="Image" />
                            <p>My Courses</p></div>
                        <div className='sidePaneDetails'>
                            <img src="https://cdn.discordapp.com/attachments/1205756212445192263/1209041969637228624/Frame-4.png?ex=65e57b14&is=65d30614&hm=7637597dec20eed0fba816a6aaa4f0d36e1b6a7251093aaee55569102d2ac7a5&" alt="Image" />
                            <p>Resources</p></div>
                        <div className='sidePaneDetails'>
                            <img src="https://cdn.discordapp.com/attachments/1205756212445192263/1209041969846947890/Frame.png?ex=65e57b14&is=65d30614&hm=306acf7f24bd7e807897054a7152d23e3fe621c21b19b41145d82c991d67a1d5&" alt="Image" />
                            <p>Event Calender</p></div>
                        <div className='sidePaneDetails'>
                            <img src="https://cdn.discordapp.com/attachments/1205756212445192263/1209041970056400896/Frame-1.png?ex=65e57b14&is=65d30614&hm=2174dceaf923c07fcaeef1d83a6071857d139e35063789d0662226656ba99b11&" alt="Image" />
                            <p>Discussion</p></div>
                    </div>
                    <div className='userDetails2'>
                        <div className='sidePaneDetails'>
                            <img src="https://cdn.discordapp.com/attachments/1205756212445192263/1209046983583731742/Frame-2.png?ex=65e57fbf&is=65d30abf&hm=7c1d73d1cffede986a89c9e160cc111f047754790805f01502514957f0a3347c&" alt="Image" />
                            <p>Feedback</p></div>
                        <div className='sidePaneDetails'>
                            <img src="https://cdn.discordapp.com/attachments/1205756212445192263/1209046983784792074/Frame.png?ex=65e57fbf&is=65d30abf&hm=d258b1a7a8fb39eee6d1ec3e8b3743bd396ea152f14e53eb9efa96534da6c9be&" alt="Image" />
                            <p>Settings</p></div>
                        <div className='sidePaneDetails'>
                            <img src="https://cdn.discordapp.com/attachments/1205756212445192263/1209046983298256916/Frame-1.png?ex=65e57fbf&is=65d30abf&hm=9f34025e077448153bee33f344d86f75d9a38eb991407431ec021c9407484188&" alt="Image" />
                            <p style={{ color: "red" }}>Logout</p></div>

                    </div>
                </div>
                <div className='RightSide'>
                    <div className='LS'>

                        <div className='Ls1'>
                            <input type='text' placeholder='Search Projects, Proposals' />
                            <image src="https://cdn.discordapp.com/attachments/1205756212445192263/1210893316523302932/loupe.png?ex=65ec3747&is=65d9c247&hm=45f191a2e75ce55db7d4c396d30cc6400ffcb8c2058b72637ada7f40ffa9d2c2&" alt="search icon" />
                        </div>
                        <div className='Ls2'>
                            <div>
                                <h3 className='subHeading'>Welcome Back, User</h3>
                                <p className='subHeading1'>Explore the Projects And Track Progress</p>
                            </div>
                            <div >
                                <button className='buttonls'>New Project</button>
                            </div>
                        </div>
                        <div className='Ls3'>
                            <h3 className='subHeading'>My Projects</h3>
                            <div className='ls3p'>
                                <p style={{ marginLeft: "5%", marginTop: "2%" }}>5 active</p>
                                <div className='ls3User'>
                                    <img src="https://img.freepik.com/free-photo/abstract-textured-backgound_1258-30581.jpg?w=1060&t=st=1708771218~exp=1708771818~hmac=03e83943f243b8b83f18bcc0fc7dabeab57018049fcfb9f74935085534d654ff" alt='' />
                                    <p className='userhead' style={{ marginLeft: '2%' }}>Username</p>
                                    <p>Project x</p>
                                    <p>Due Date</p>
                                </div>
                                <div className='ls3User'>
                                    <img src="https://img.freepik.com/free-photo/abstract-textured-backgound_1258-30581.jpg?w=1060&t=st=1708771218~exp=1708771818~hmac=03e83943f243b8b83f18bcc0fc7dabeab57018049fcfb9f74935085534d654ff" alt='' />
                                    <p className='userhead' style={{ marginLeft: '2%' }}>Username</p>
                                    <p>Project x</p>
                                    <p>Due Date</p>
                                </div>
                                <div className='ls3User'>
                                    <img src="https://img.freepik.com/free-photo/abstract-textured-backgound_1258-30581.jpg?w=1060&t=st=1708771218~exp=1708771818~hmac=03e83943f243b8b83f18bcc0fc7dabeab57018049fcfb9f74935085534d654ff" alt='' />
                                    <p className='userhead' style={{ marginLeft: '2%' }}>Username</p>
                                    <p>Project x</p>
                                    <p>Due Date</p>
                                </div>
                                <button className='ls3button'>View all</button>
                            </div>
                        </div>
                        <div className='Ls4'>
                            <h3 className='subHeading'>Project Hours</h3>
                            <div className='ls3p'>

                            </div>
                        </div>
                    </div>
                    <div className='RS'>
                        <h3 className='subHeading'>Upcoming Project Milestone</h3>
                        <div className='RsBox'>
                            <div className='rsUser'>
                                <img src="https://img.freepik.com/free-photo/abstract-textured-backgound_1258-30581.jpg?w=1060&t=st=1708771218~exp=1708771818~hmac=03e83943f243b8b83f18bcc0fc7dabeab57018049fcfb9f74935085534d654ff" alt='' />
                                <p className='userhead' style={{ marginLeft: '2%' }}>Project kickoff meeting</p>
                                <p>10:00-11:00</p>
                            </div>
                            <p className='rssubhead'>3 of 5 sections </p>
                            <div className='rsUser'>
                                <img src="https://img.freepik.com/free-photo/abstract-textured-backgound_1258-30581.jpg?w=1060&t=st=1708771218~exp=1708771818~hmac=03e83943f243b8b83f18bcc0fc7dabeab57018049fcfb9f74935085534d654ff" alt='' />
                                <p className='userhead' style={{ marginLeft: '2%' }}>Project kickoff meeting</p>
                                <p>10:00-11:00</p>
                            </div>
                            <p className='rssubhead'>3 of 5 sections </p>
                            <div className='rsUser'>
                                <img src="https://img.freepik.com/free-photo/abstract-textured-backgound_1258-30581.jpg?w=1060&t=st=1708771218~exp=1708771818~hmac=03e83943f243b8b83f18bcc0fc7dabeab57018049fcfb9f74935085534d654ff" alt='' />
                                <p className='userhead' style={{ marginLeft: '2%' }}>Project kickoff meeting</p>
                                <p>10:00-11:00</p>
                            </div>
                            <p className='rssubhead'>3 of 5 sections </p>
                            <div className='rsUser'>
                                <img src="https://img.freepik.com/free-photo/abstract-textured-backgound_1258-30581.jpg?w=1060&t=st=1708771218~exp=1708771818~hmac=03e83943f243b8b83f18bcc0fc7dabeab57018049fcfb9f74935085534d654ff" alt='' />
                                <p className='userhead' style={{ marginLeft: '2%' }}>Project kickoff meeting</p>
                                <p>10:00-11:00</p>
                            </div>
                            <p className='rssubhead'>3 of 5 sections </p>
                            <div className='rsUser'>
                                <img src="https://img.freepik.com/free-photo/abstract-textured-backgound_1258-30581.jpg?w=1060&t=st=1708771218~exp=1708771818~hmac=03e83943f243b8b83f18bcc0fc7dabeab57018049fcfb9f74935085534d654ff" alt='' />
                                <p className='userhead' style={{ marginLeft: '2%' }}>Project kickoff meeting</p>
                                <p>10:00-11:00</p>
                            </div>
                            <p className='rssubhead'>3 of 5 sections </p>

                            <button className='rsbutton'>View Full Schedule</button>
                        </div>
                    </div>
                </div>
            </div>


            <Footer />
        </div>
    );
};

export default ContactUs;
