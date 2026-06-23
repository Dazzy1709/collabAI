import Sidebar from '../components/sidebar/Sidebar';
import ChatSection from '../components/messages/components/ChatSection';

type Props = {}

const Home = (props: Props) => {
  return (
    
    <div className="homepage flex">
      <div className="homepage-sidebar">
        <Sidebar />
      </div>
      
      <ChatSection />
    </div>
     
  
   
  )
}

export default Home