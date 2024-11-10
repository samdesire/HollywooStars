   // src/App.jsx
   import { BrowserRouter, Routes, Route } from 'react-router-dom';
   import Home from './Home';
   import PlaySolo from './PlaySolo';
   import PlayFriend from './PlayFriend';
   import HowTo from './HowTo';
   // ... import other pages

   function App() {
       return (
           <BrowserRouter>
               <Routes>
                   <Route path="/" element={<Home />} />
                   <Route path="/play-solo" element={<PlaySolo />} />
                   <Route path="/play-with-friend" element={<PlayFriend />} />
                   <Route path="/how-to-play" element={<HowTo />} />
               </Routes>
           </BrowserRouter>
       );
   }

   export default App;