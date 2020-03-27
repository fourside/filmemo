import React from 'react';
import Amplify from "aws-amplify";
import awsmobile from "./aws-exports";

import './App.css';

Amplify.configure(awsmobile);

export const App: React.FC = () => {
  return (
    <div className="App">
      app
    </div>
  );
};

