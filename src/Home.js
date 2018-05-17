import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from 'contentful';

class Home extends Component {
  state = {
    posts: []
  };

  componentWillMount() {
    const client = createClient({
      space: process.env.REACT_APP_SPACE_ID,
      accessToken: process.env.REACT_APP_ACCESS_TOKEN,
    });

    client
      .getEntries({})
      .then(response => {
        this.setState({
          posts: response.items
        });
      })
      .catch(console.error);
  }

  render() { 
    if (!this.state.posts.length) return <p>No posts found.</p>;

    return this.state.posts.map(post => {
      if(!post.fields.body) return null;
      console.log(post);
      return (
        <div className="App-links">
          <Link key={post.sys.id} to={`post/${post.sys.id}/`}>
            {post.fields.title}
          </Link><br/>
        </div>
      );
    });
  }
}
 
export default Home;