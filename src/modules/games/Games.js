import React, { Component } from 'react';
import axios from 'axios';

class Games extends Component {
  state = { games: [], loading: false }

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: { games } } = await axios.get('/api');

    setTimeout(() => this.setState({ loading: false, games }), 1000);
  }

  render() {
    const {
      games,
      loading
    } = this.state;
    if (loading) {
      return <h1>Loading...</h1>;
    }
    return (
      <div>
        {games.map(({ name }, i) => (
          <li key={i}>
            {name}
          </li>
        ))}
      </div>
    );
  }
}

export default Games;
