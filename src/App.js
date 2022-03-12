import { AppRouter } from './router/AppRouter';
import { createGlobalStyle } from 'styled-components';
import mobileBackground from './assets/background-mobile.png';
import desktopBackground from './assets/background-desktop.png';

function App() {
  return (
    <>
      <Normalize />
      <AppRouter />
    </>
  );
}
const Normalize = createGlobalStyle`
  * {
    margin: 0;
    padding: 0px;
  }
  body {
    background-image: url(${mobileBackground});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    transition: background-image 0.3s ease-in-out;

    @media (min-width: 600px) {
      background-image: url(${desktopBackground});
    }
  }
`;
export default App;
