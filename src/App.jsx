import { Routes, Route, Link,useParams } from 'react-router-dom';
import TextEditor from "./components/TextEditor/TextEditor"
import Home from './components/home/Home';

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

const EditorWithRoom = () => {
  const { docId } = useParams();
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_I1p6i8u8psh1bpr9Z-X8a1zSS0XWHjYCJQDYi_2del3kcwhDaNeTlvyw_xuoscIo"}>
      <RoomProvider id={docId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <TextEditor/>
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/editor/:docId" element={<EditorWithRoom />} />
      </Routes>
    </div>
  );
}

export default App;