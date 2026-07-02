import { Link } from 'react-router';
import { useState } from 'react';
import IntoAccountBtn from '../../universal/IntoAccountBtn';
import UserProfile from './UserProfile';

type Props = {}

const UserContainer = (props: Props) => {
const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      { loggedIn ? (
          <UserProfile username='Dazzy' online={true} avatar_url=''/>
      ) : (
      <section>
        <div className="user-profile-buttons">
          <div className="into-account-btn my-3">
            <Link to='/login'>
              <IntoAccountBtn text="Log in" />
            </Link>
          </div>
          <div className="into-account-btn my-3">
            <Link to='/signup'>
              <IntoAccountBtn text="Sign up" />
            </Link>
          </div>
        </div>
      </section>
      )}  
    </div>
  )
}

export default UserContainer;