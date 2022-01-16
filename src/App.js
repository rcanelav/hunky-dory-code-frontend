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
`;
export default App;
