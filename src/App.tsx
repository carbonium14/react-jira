import { ErrorBoundary } from 'components/error-boundary';
import { FullPageErrorFallBack, FullPageLoading } from 'components/lib';
import { useAuth } from 'context/auth-context';
import React from 'react';
import './App.css';
const AuthenticatedApp=React.lazy(()=>import('authenticated-app'))
const UnAuthenticatedApp=React.lazy(()=>import('unauthenticated-app'))
function App() {
  const {user} = useAuth()
  return (
    <div>
      <ErrorBoundary fallbackRender={FullPageErrorFallBack}>
        <React.Suspense fallback={<FullPageLoading></FullPageLoading>}>
          {user?<AuthenticatedApp></AuthenticatedApp>:<UnAuthenticatedApp></UnAuthenticatedApp>}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
