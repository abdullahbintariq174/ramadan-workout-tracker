import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RamadanWorkoutApp from './RamadanWorkoutApp';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faDumbbell, faFire, faWind, faSync, faWalking, faArrowsAltH,
  faChevronDown, faShoes, faArrowUp, faChevronUp, faArrowDown,
  faHandPaper, faMountain, faHand, faExpand, faRunning, faLevelUpAlt,
  faCompress, faCoffee, faCloud, faHead
} from '@fortawesome/free-solid-svg-icons';

// Add FontAwesome icons to library (updated with correct icon names)
library.add(
  faDumbbell, faFire, faWind, faSync, faWalking, faArrowsAltH,
  faChevronDown, faShoes, faArrowUp, faChevronUp, faArrowDown,
  faHandPaper, faMountain, faHand, faExpand, faRunning, faLevelUpAlt,
  faCompress, faCoffee, faCloud, faHead
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RamadanWorkoutApp />
  </React.StrictMode>
);
