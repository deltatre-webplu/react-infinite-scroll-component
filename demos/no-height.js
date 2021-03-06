import React from 'react';
import ReactDOM from 'react-dom';

import InfiniteScroll from '../app';

const style = {
  display: 'flex',
  alignItems: 'center',
  fontSize: 40
};

const divs = [
  <div key={1} style={{ height: 200, background: '#9bc95b', ...style }}>Div no 1</div>,
  <div key={2} style={{ height: 200, background: '#ffd47b', ...style }}>Div no 2</div>,
  <div key={3} style={{ height: 200, background: '#95a9d6', ...style }}>Div no 3</div>,
  <div key={4} style={{ height: 200, background: '#ffa8e1', ...style }}>Div no 4</div>,
  <div key={5} style={{ height: 200, background: '#9bc95b', ...style }}>Div no 5</div>,
  <div key={6} style={{ height: 200, background: '#ffd47b', ...style }}>Div no 6</div>,
  <div key={7} style={{ height: 200, background: '#95a9d6', ...style }}>Div no 7</div>,
  <div key={8} style={{ height: 200, background: '#ffa8e1', ...style }}>Div no 8</div>,
];

const noHeightMessage = 'No height given to InfiniteScroll, free scroll like Facebook. Also try Pull Down to refresh! :P';
const colors = ['#9bc95b', '#ffd47b', '#95a9d6', '#ffa8e1'];

export default class NoHeight extends React.Component {
  constructor() {
    super();
    this.state = {
      divs: divs
    };
    this.generateDivs = this.generateDivs.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  generateDivs() {
    let moreDivs = [];
    let count = this.state.divs.length;
    for (let i = 0; i < 30; i++) {
      moreDivs.push(
        <div key={'div' + count++} style={{ height: 200, background: colors[i % 4], ...style }}>
          Div no {count}
        </div>
      );
    }
    setTimeout(() => {
      this.setState({ divs: this.state.divs.concat(moreDivs) });
    }, 500);
  }

  refresh() {
    this.setState({ divs: [] });
    setTimeout(() => {
      this.setState({ divs });
    }, 3000);
  }

  render() {
    return (
      <div>
        <h3>{noHeightMessage}</h3>
        <InfiniteScroll
          pullDownToRefresh={true}
          pullDownToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>}
          releaseToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>}
          refreshFunction={this.refresh}
          next={this.generateDivs}
          hasMore={true}
          dataLength={this.state.divs.length}
          loader={<h1>Loading...</h1>}>
          {this.state.divs}
        </InfiniteScroll>
      </div>
    );
  }
}
