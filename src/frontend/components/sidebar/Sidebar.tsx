import UserList from './components/UserList';
import UserContainer from './components/UserContainer';
import SearchingUser from './components/SearchingUser';

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <div className='border-2 h-screen px-3 py-3'>
      <div className="User-container">
        <UserContainer />
      </div>
      <div className="Searching-user my-4">
        <SearchingUser />
      </div>
      <div className="User-list">
        <UserList />
      </div>
    </div>
  )
}

export default Sidebar;