import React from 'react';
import { IconButton } from './components/buttons/IconButton';
import { Button } from './components/buttons/Button';
import { ICON_NAME } from './unions/icon-name';
import './App.css';

function App() {
  return (
    <div>
      <IconButton icon={{ name: ICON_NAME.ADD }} />
      <Button label='create' />
    </div>
  )
}

export default App;
