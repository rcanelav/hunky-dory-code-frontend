import { AppRouter } from './router/AppRouter';
import { createGlobalStyle } from 'styled-components';

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
    
    background-image: url("https://res.cloudinary.com/rayci/image/upload/v1646775194/back-hdc-mobile_y6fh2l.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    transition: background-image 0.3s ease-in-out;

    @media (min-width: 600px) {
      background-image: url("https://res.cloudinary.com/rayci/image/upload/v1646774722/back-hdc_fh0dm2.png");
    }
  }
`;
export default App;
