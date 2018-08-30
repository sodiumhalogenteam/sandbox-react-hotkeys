import React, {Component} from 'react';
import styled from 'styled-components';
import {HotKeys} from 'react-hotkeys';
import TextInput from './TextInput';

const Styles = styled.div`
  height: 100vh;
  width: 100vh;
  input {
    height: 20px;
    margin: 0 12px;
    padding: 10px;
  }
  .Querybar {
    display: flex;
    width: 100%;
    height: 80px;
    border: 1px solid #ccc;
    padding: 15px 0;
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
  outline: 0;
`;

const keyMap = {
  togglePanel: 'p',
  focusQuery: '/',
  focusTag: '`',
  goToTable: 't',
  goToNodes: 'n',
  goToTimeline: 'T',
};

class App extends Component {
  constructor() {
    super();

    this.inputQueryRef = React.createRef();
    this.inputTagRef = React.createRef();
  }

  state = {
    disableHotkeys: false,
    resultsFormatMenu: 'force',
    isPanelOpen: false,
  };

  componentDidMount() {
    //focus the user onto the top component on page load
    document.querySelector('#hotkeys').focus();
  }

  changeResultsFormatMenu = value => {
    this.setState({resultsFormatMenu: value});
  };

  togglePanel = () => {
    this.setState({isPanelOpen: !this.state.isPanelOpen});
  };

  onInputFocus = () => {
    this.setState({disableHotkeys: true});
  };

  onInputBlur = () => {
    this.setState({disableHotkeys: false});
  };

  render() {
    const keyHandlers = this.state.disableHotkeys
      ? {}
      : {
          focusQuery: () => {
            this.inputQueryRef.current.focus();
            return false;
          },
          focusTag: () => {
            this.inputTagRef.current.focus();
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
            <TextInput
              customeRef={this.inputQueryRef}
              placeholder="type here pls"
              label="search"
              onInputFocus={this.onInputFocus}
              onInputBlur={this.onInputBlur}
            />
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
              <TextInput
                customeRef={this.inputTagRef}
                placeholder="type here pls"
                label="add tag"
                onInputFocus={this.onInputFocus}
                onInputBlur={this.onInputBlur}
              />
            </div>
          </div>
        </Styles>
      </StyledHotKeys>
    );
  }
}

export default App;
