import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RamadanWorkoutApp from './RamadanWorkoutApp';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Import all solid icons instead of individual ones
library.add(fas);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RamadanWorkoutApp />
  </React.StrictMode>
);
