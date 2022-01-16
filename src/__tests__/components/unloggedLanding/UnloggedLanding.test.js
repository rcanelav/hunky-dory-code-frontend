import { render, screen} from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UnloggedLanding } from '../../../components/unloggedLanding/UnloggedLanding';
import { AuthProvider } from '../../../hooks/useAuthorization';
describe('<UnloggedLanding />', () => {
  const mountComponent = ( component ) => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          { component }
        </AuthProvider>
      </BrowserRouter>
    );
  }
  beforeEach( () => mountComponent( <UnloggedLanding /> ));

  test('Sign Up button should be in the document', () => {
    const signUpButton = screen.getByText(/Sign up/i);
    expect(signUpButton).toBeInTheDocument();
  });
  test('Sign Up button should have /register link', () => {
    const signUpButton = screen.getByText(/Sign up/i).parentNode;
    expect(signUpButton).toBeInTheDocument();
    expect(screen.getByText(/Sign up/i).parentNode).toHaveAttribute('href', '/register');
  });
  test('Sign In button should be in the document', () => {
    const signInButtn = screen.getByText(/Sign in/i);
    expect(signInButtn).toBeInTheDocument();
  });
  test('Sign In button should have /login', () => {
    const signInButton = screen.getByText(/Sign in/i).parentNode;
    expect(signInButton).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i).parentNode).toHaveAttribute('href', '/login');
  });
});
