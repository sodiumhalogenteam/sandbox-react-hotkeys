import React, {Component} from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  .Querybar {
    display: flex;
    width: 100%;
    height: 80px;
    border: 1px solid #ccc;
    padding: 15px 0;
    input {
      height: 40px;
      margin: 0 12px;
    }
  }
  .Container {
    display: flex;
    width: 100%;
    .Body {
      padding: 0 15px;
      border: 1px solid #ccc;
      width: 70%;
    }
    .Panel {
      padding: 0 15px;
      border: 1px solid #ccc;
      width: 30%;
    }
  }
`;

class App extends Component {
  state = {
    resultsFormatMenu: 'force',
    isPanelOpen: false,
  };

  changeResultsFormatMenu = e => {
    this.setState({resultsFormatMenu: e.target.value});
  };

  togglePanel = () => {
    this.setState({isPanelOpen: !this.state.isPanelOpen});
  };

  render() {
    return (
      <Styles>
        <div className="Querybar">
          <label htmlFor="">Query Bar</label>
          <input type="text" />
        </div>
        <div className="Container">
          <div className="Body">
            <select
              name="resultsFormatMenu"
              id="resultsFormatMenu"
              value={this.state.resultsFormatMenu}
              onChange={e => this.changeResultsFormatMenu(e)}>
              <option value="table">Table</option>
              <option value="force">Force</option>
              <option value="timeline">Timeline</option>
            </select>

            {(this.state.resultsFormatMenu === 'table' && <p>Table here</p>) ||
              (this.state.resultsFormatMenu === 'force' && <p>Force here</p>) ||
              (this.state.resultsFormatMenu === 'timeline' && <p>Timeline here</p>)}
          </div>
          <div className="Panel">
            <button onClick={this.togglePanel}>{this.state.isPanelOpen ? 'panel is open' : 'panel is closed'}</button>
          </div>
        </div>
      </Styles>
    );
  }
}

export default App;
