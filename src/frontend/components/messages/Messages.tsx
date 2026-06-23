import ChatSectionHeader from './components/ChatSectionHeader';
import ChatSection from './components/ChatSection';
import ChatInput from './components/ChatInput';

type Props = {}

const Messages = (props: Props) => {
  return (
    <div>DirectMessages
      <ChatSectionHeader />
      <ChatSection />
      <ChatInput />
    </div>
  )
}

export default Messages;