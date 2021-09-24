import React from 'react';
import { useSelector } from 'react-redux';
import UsersPage from '../Pages/LoginSignup/user-page';
import WelcomePage from '../Pages/Homepage/welcome-page';

export default function Home(): JSX.Element {
  let login = useSelector(
    (state: {
      users: any
      login: boolean
    }) => state.users.login
  );

  if (login) {
    return (
      <div>
        <WelcomePage />
      </div>
    );
  } else {
    return (
      <div>
        <UsersPage />
      </div>
    );
  }
}
