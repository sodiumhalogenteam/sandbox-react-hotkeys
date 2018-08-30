import React, {Component} from 'react';
import styled from 'styled-components';
import {HotKeys} from 'react-hotkeys';

const Styles = styled.div`
  height: 100vh;
  width: 100vh;
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

const StyledHotKeys = styled(HotKeys)`
  outline: none;
`;

const keyMap = {
  togglePanel: 'p',
  focusQuery: '/',
  goToTable: 't',
  goToNodes: 'n',
  goToTimeline: 'T',
};

class App extends Component {
  state = {
    resultsFormatMenu: 'force',
    isPanelOpen: false,
  };

  changeResultsFormatMenu = value => {
    this.setState({resultsFormatMenu: value});
  };

  togglePanel = () => {
    this.setState({isPanelOpen: !this.state.isPanelOpen});
  };

  componentDidMount() {
    //focus the user onto the top component on page load
    document.querySelector('#hotkeys').focus();
  }

  render() {
    const keyHandlers = {
      focusQuery: () => {
        document.querySelector('input').focus();
        return false;
      },
      togglePanel: this.togglePanel,
      goToTable: () => {
        this.changeResultsFormatMenu('table');
      },
      goToNodes: () => {
        this.changeResultsFormatMenu('force');
      },
      goToTimeline: () => {
        this.changeResultsFormatMenu('timeline');
      },
    };
    return (
      <StyledHotKeys id="hotkeys" keyMap={keyMap} handlers={keyHandlers}>
        <Styles>
          <div className="Querybar">
            <label htmlFor="">Query Bar</label>
            <input type="text" placeholder="search me pls" />
          </div>
          <div className="Container">
            <div className="Body">
              <select
                name="resultsFormatMenu"
                id="resultsFormatMenu"
                value={this.state.resultsFormatMenu}
                onChange={e => this.changeResultsFormatMenu(e.target.value)}>
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
      </StyledHotKeys>
    );
  }
}

export default App;
