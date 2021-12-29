import React, { Component } from 'react'
import './Gitstyle.css';
import "https://kit.fontawesome.com/3437ba5382.js";
import moment from 'moment';

export default class Git extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userDetails: [],
            userInput: "",
            hide: false,
        }
    }
    getUser = (e) => {
        e.preventDefault();
        fetch(`https://api.github.com/users/${this.state.userInput}`)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    userDetails: [json],
                    hide: true,
                })
            })
    }
    getInput = (input) => {
        this.setState({
            userInput: input.target.value
        })
    }
    render() {
        const my = {
            paddingLeft: "2%",
        }
        console.log(this.state.userInput);

        console.log(this.state.userDetails);
        console.log(this.state.userDetails.bio);

        return (

            <>
            <div className='container'>
                <div className='top'>
                    <div className='top-left'><h3>devfinder</h3></div>
                    <div className='top-right'><p>Light     <i class="fas fa-sun"></i></p></div>
                </div>
                <form>
                    <div className='input-container'>
                        <div><input type="text" id="user-input" className='user-input' placeholder='Search Github Username...' onChange={this.getInput} /></div>
                        <div><button id='btn' className="btn" type="submit" onClick={this.getUser}>Search</button></div>
                    </div>

                    <div className={this.state.hide ? ('user-details') : (" user-details-b")}>
                        {this.state.userDetails.map((n, i) => {
                            return (
                                <>

                                    <div key={i}>
                                        <img src={n.avatar_url} alt="" />
                                        <div className='primary-info'>
                                            <div className='name'>
                                                <div><h2 >{n.login}</h2></div>

                                                <div className='date'><p>Joined at {moment(n.created_at).format('MMMM DD YYYY')}</p></div>
                                            </div>
                                            <p className='bio'>{n.bio == null ? (<p>No bio for this profile</p>) : (<p>{n.bio}</p>)}</p>
                                            <div className='repos' id='repos'>
                                                <div className='repo1'><p>Repos</p>
                                                    <p>{n.public_repos}</p></div>

                                                <div className='repo2'><p>Followers</p>
                                                    <p>{n.followers}</p></div>
                                                <div className='repo3'><p>Following</p>
                                                    <p>{n.following}</p></div>
                                            </div>
                                            <div className='media-info'>
                                                <p><i className="fas fa-map-marker-alt"></i>       {n.location}</p>
                                                <div className='rishi'>
                                                    <div style={my} ><i className="fab fa-twitter"></i>   </div>   <div style={my}>    {n.twitter_username}</div>
                                                </div>
                                                <div className='blogs'>
                                                    <div ><i className="fas fa-link"></i> </div>          <div style={my}>      {n.blog}</div>
                                                </div>
                                                <p><i className="fas fa-building"></i>             {n.company}</p>
                                            </div>
                                        </div>
                                    </div>


                                </>
                            )
                        })}
                    </div>
                </form>
                </div>
            </>
        )
    }
}
