import React from 'react';
import { FmlxButton } from 'fmlx-common-ui';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <>
      <Link to="/Login">
        <FmlxButton label={'Login'} />
      </Link>
      <Link to="/Register">
        <FmlxButton label={'Register'} />
      </Link>
    </>
  );
};

export default Main;
