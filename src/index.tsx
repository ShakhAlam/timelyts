import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter ,
  Router,Routes,Route, Outlet

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
import Publish from './routes/Publish';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="signin" element={<Signin />} />
          <Route path="schedules" element={<Calendar />} />
          <Route path="publish" element={<Publish />} />
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
