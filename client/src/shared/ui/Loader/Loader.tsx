import React from 'react';
import './Loader.css';

function Loader(): JSX.Element {
  return (
    <div className="lds-ellipsis">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}

export default Loader;
