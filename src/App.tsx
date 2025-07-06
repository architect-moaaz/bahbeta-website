import { DirectImageDisplay } from './components/DirectImageDisplay';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <DirectImageDisplay />
      <Analytics />
    </>
  );
}

export default App;