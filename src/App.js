import { AppRouter } from './router/AppRouter';
import { createGlobalStyle } from 'styled-components';
import background from './assets/background.jpg';
import helvi from './assets/Helvetica.otf';

function App() {
  return (
    <>
      <Normalize />
      <AppRouter />
    </>
  );
}
const Normalize = createGlobalStyle`
  @font-face {
    font-family: "helvi";
    src: local("helvi"), url(${helvi}) format("truetype");
  }
  * {
    margin: 0;
    padding: 0px;
    font-family: "helvi";
  }
  body {
    background-image: url(${background});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
  }
`;
export default App;
