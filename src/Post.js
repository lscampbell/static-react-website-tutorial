import React, { Component, createElement, Fragment } from 'react';
import { createClient } from 'contentful';
import Helmet from 'react-helmet';
import marksy from 'marksy';

// Markdown helper function
const getMarkup = field => {
  if (!field) return null;
  
  const compile = marksy({
    createElement,
    elements: {}
  });
  
  return compile(field).tree;
};

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentWillMount() {
    const client = createClient({
      space: process.env.REACT_APP_SPACE_ID,
      accessToken: process.env.REACT_APP_ACCESS_TOKEN,
    });

    client
      .getEntry(this.props.match.params.id)
      .then(response => {
        this.setState({
          data: response.fields
        });
      })
      .catch(console.error);
  }

  render() { 
    if (!this.state.data) return null;
    
    const content = getMarkup(this.state.data.body);
    
    return (
      <Fragment>
        <Helmet title={this.state.data.title} />
        <h1>{this.state.data.title}</h1>
        {content}
      </Fragment>
    );
  }
}
 
export default Post;