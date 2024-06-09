import React from 'react';

class UserClass extends React.Component{
    constructor(props) {
        super(props);
       //state variable
        this.state = {
            userInfo : {
                login : "DummyName",
                location : "Default",
                avatar_url : "http://dummy.com"
            }
        }
    }

    async componentDidMount(){
        //api call
        const data = await fetch("https://api.github.com/users/tarunkumarmahay");
        const json = await data.json();

        this.setState({userInfo : json});
        console.log(json);
    }
    render(){
        const {login, location, avatar_url} = this.state.userInfo;

        return (
        <div className='user-card px-4 py-2'>            
            <h2 className="font-bold ">Name: {login}</h2>
            <img className="rounded-lg"src = {avatar_url}></img>
            <h2 className="font-bold">Location : {location}</h2>
            <h3>https://github.com/TarunKumarMahay</h3>
        </div>
        );
    }
}

export default UserClass;