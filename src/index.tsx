import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter ,
  Router,Routes,Route, Outlet, HashRouter

} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'

// Put any other imports below so that CSS from your
// components takes precedence over default styles.

import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';
import Profile from './routes/Profile';
import Home from './routes/Home';
import Signin from './routes/Signin';
import Calendar from './routes/Calendar'
import Publish from './routes/publish/Publish';
import Subscriptions from './routes/Subscriptions';
import Contacts from './routes/Contacts';
import Automations from './routes/Automations';
import BookingPage from './routes/BookingPage';
import NewSessionType from './routes/publish/NewSessionType';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="signin" element={<Signin />} />
          <Route path="schedules" element={<Calendar />} />
          <Route path="publish/create/:type" element={<NewSessionType />}/>
          <Route path="publish" element={<Publish />}>
            
          </Route>
          <Route path="subscriptions" element={<Subscriptions/>} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="automations" element={<Automations />} />
          <Route path="booking-page" element={<BookingPage />} />
          
          <Route
            path="*"
            element={
              <main style={{padding: "1rem"}}>
                  <p>This route is not found</p>
              </main>
            }
          />
        
        </Route>


      </Routes>
      
      
    </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
