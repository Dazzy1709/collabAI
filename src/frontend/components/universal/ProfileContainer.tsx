import React from 'react';
import { useState } from 'react';
import CreateChatBtn from './CreateChatBtn';



type ProfileDisplayProps = {
  username: string;
  online: boolean;
  avatar_url: string;
}

const ProfileContainer = ({username = 'Default user', online = false, avatar_url = 'https://images.cgames.de/images/gsgp/290/one-piece-schwert-zorro_6256202.jpg'}: ProfileDisplayProps) => {

  const [popup, setPopup] = useState(false);
  const [isFriend, setIsFriend] = useState(false);

  function ControlModal (popupState: boolean) {
    if (popup === popupState)
      setPopup(true)
    else setPopup(false)
  };

  
  let availability :string;
  function setAvailabilityColor () {
    if (!online) {
      availability = 'Offline';
    } else {
      availability = 'online';
    }
  };
  setAvailabilityColor();

  return (
    <div className='profile-container '>
      <figure className='flex align-middle justify-between'>
        <div className="left-side mr-3">
          <div className="avatar">
            <img className='w-10 h-10 border rounded-full' src={avatar_url} alt="" />
          </div>
        </div>
        
        <div className="middle">
          <div className="username text-sm">
            <figcaption className='font-semibold'>
              {username}
            </figcaption>
          </div>
          <div className="available text-xs font-light">
            <div className="availability-color bg-red-600"></div>
            <div className="availability-status">{availability}</div>
          </div>
        </div>

        {/*Add as a friend Button or Already added as a friend logo */}
        {}
        <div className="right-side">
          <CreateChatBtn chatModal={() => ControlModal(true)} />
        </div>
      </figure>
    </div>
  )
}

export default ProfileContainer;