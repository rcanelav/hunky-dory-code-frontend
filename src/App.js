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
    background-color: rgba(0,163,152, 1);
  }
`;
export default App;
