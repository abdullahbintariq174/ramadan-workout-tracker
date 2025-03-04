import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RamadanWorkoutApp from './RamadanWorkoutApp';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faDumbbell, faFireAlt, faWind, faSyncAlt, faWalking, faArrowsAltH,
  faChevronDown, faShoeprints, faArrowUp, faChevronUp, faArrowDown,
  faHands, faMountain, faHandPointUp, faExpand, faRunning, faLevelUpAlt,
  faCompress, faCoffee, faCloud, faHeadSide
} from '@fortawesome/free-solid-svg-icons';

// Add FontAwesome icons to library
library.add(
  faDumbbell, faFireAlt, faWind, faSyncAlt, faWalking, faArrowsAltH,
  faChevronDown, faShoeprints, faArrowUp, faChevronUp, faArrowDown,
  faHands, faMountain, faHandPointUp, faExpand, faRunning, faLevelUpAlt,
  faCompress, faCoffee, faCloud, faHeadSide
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RamadanWorkoutApp />
  </React.StrictMode>
);
