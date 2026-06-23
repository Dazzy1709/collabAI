import { useState } from 'react';
import CreateChatBtn from '../../universal/CreateChatBtn';
import CreateChatModal from '../../universal/CreateChatModal';

type ProfileDisplayProps = {
  username: string;
  online: boolean;
  avatar_url: string;
}

const UserProfile = ({username = 'Default User', online = false, avatar_url = 'https://images.cgames.de/images/gsgp/290/one-piece-schwert-zorro_6256202.jpg'}: ProfileDisplayProps) => {

  const [modal, setModal] = useState(false);

  function ControlModal () {
    setModal(prev => !prev);
  };

  let availability :string;

  function setAvailabilityColor () {
    if (!online) {
      availability = 'Offline'; 
      return;
    }
    availability = "Online";
  };
  setAvailabilityColor();

  return (
    <>
      <div className='profile-container '>
       <figure className='flex justify-between items-center'>
        <div className="left-side flex items-center mr-3">
          <div className="avatar mr-3">
            <img className='w-10 h-10 border rounded-full' src={avatar_url} alt="" />
          </div>
          <div className="user text-sm">
            <figcaption className='font-semibold'>
              {username}
            </figcaption>
            <div className="available flex items-center text-[11px] font-light">
              <div className="availability-color mr-0.5 p-1 opacity-80 bg-green-500 rounded-full"></div>
              <div className="availability-status text-green-500">{availability}</div>
           </div>
          </div>
        </div>
        
        <div className="right-side">
          <CreateChatBtn chatModal={() => ControlModal()} />
        </div>
       </figure>
      </div>
      {modal ?
        <CreateChatModal isOpen={modal} onClose={() => setModal(false)} onSubmit={() => {}}  /> : null}
    </>
  )
}

export default UserProfile;