import React from 'react';
import {ManuItem, 
        FormControl,
        Select}
        from '@material-ui/core';
import './App.css';

function App() {
    return ( 
    <div className="app" > { /*BEM naming convention*/ } 
      <div className="app__header">
        <h1>COVID 19 Tracker</h1> 
        <FormControl className="app__dropdown">
        <Select variant="outlined" value="abc">
            <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Option two</MenuItem>
            <MenuItem value="worldwide">Option 3</MenuItem>
            <MenuItem value="worldwide">YOOOOOOOO</MenuItem>
          </Select>
        </FormControl>
      </div>
        
        {/* Header */}
        {/* Title + Select Input Dropdown Field*/}

        {/*InfoBox*/}
        {/*InfoBox*/}
        {/*InfoBox*/}

        {/* Table */}
        {/* Graph */}

        {/* Map */}
    </div>
    );
}

export default App;