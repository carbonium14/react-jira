import './wdyr.ts'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from 'context/auth-context';
// import {loadDevTools, Devtools} from 'jira-dev-tool'
import 'antd/dist/antd.less'
import { Profiler } from 'components/profiler';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// loadDevTools(()=> {

// })
root.render(
  <React.StrictMode>
    <Profiler id='Root App' phases={['mount']}>
      <AuthProvider>
        {/* <Devtools></Devtools> */}
        <App />
      </AuthProvider>
    </Profiler>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
