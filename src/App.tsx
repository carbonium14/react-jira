import { AuthenticatedApp } from 'authenticated-app';
import { useAuth } from 'context/auth-context';
import { UnAuthenticatedApp } from 'unauthenticated-app';
import './App.css';
function App() {
  const {user} = useAuth()
  return (
    <div>
    {
      user?<AuthenticatedApp></AuthenticatedApp>:<UnAuthenticatedApp></UnAuthenticatedApp>
    }
    </div>
  );
}

export default App;
