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
    background-image: url("https://res.cloudinary.com/rayci/image/upload/v1646156854/bg1_syd8wt.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
  }
`;
export default App;
