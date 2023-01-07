import { AuthenticatedApp } from 'authenticated-app';
import { ErrorBoundary } from 'components/error-boundary';
import { FullPageErrorFallBack } from 'components/lib';
import { useAuth } from 'context/auth-context';
import { UnAuthenticatedApp } from 'unauthenticated-app';
import './App.css';
function App() {
  const {user} = useAuth()
  return (
    <div>
      <ErrorBoundary fallbackRender={FullPageErrorFallBack}>
        {user?<AuthenticatedApp></AuthenticatedApp>:<UnAuthenticatedApp></UnAuthenticatedApp>}
      </ErrorBoundary>
    </div>
  );
}

export default App;
