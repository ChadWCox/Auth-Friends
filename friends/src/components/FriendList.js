import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';



class FriendList extends React.Component {
    state = {
      friends: [],
      newFriend: {
          name: '',
          age: '',
          email: '',
      }
    };

    handleChange = e => {
        this.setState({
            newFriend: {
                ...this.state.newFriend,
                [e.target.name]: e.target.value,
            }
        })
    };

    handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
        .post('http://localhost:5000/api/friends', this.state.newFriend)
        .then(res => {
            this.setState({
                friends: res.data,
            })
        }) 
        .catch(err => {
            console.log(err.message)
        })
    }

    componentDidMount() {
        this.fetchFriends();
    }
    
    fetchFriends = () => {
        axiosWithAuth()
        .get('http://localhost:5000/api/friends')
        .then(res => {
            this.setState({
                friends: res.data,
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    };

    render() {
        return (
            <div>
        <h2>Add new friend!</h2>
        <form className={'form'} onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder='name'
            value={this.state.newFriend.name}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="age"
            placeholder='age'
            value={this.state.newFriend.age}
            onChange={this.handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder='email'
            value={this.state.newFriend.email}
            onChange={this.handleChange}
          />
          <button>Add</button>
        </form>
        <div>
            <h2>List of Friends</h2>
        {!this.state.friends
          ? null
          : this.state.friends.map((friend) => (
              <div>
                <h3>{friend.name}</h3>
                <p>{friend.age}</p>
                <p>{friend.email}</p>
              </div>
            ))}
        </div>
      </div>
    );
    }
};

    export default FriendList;