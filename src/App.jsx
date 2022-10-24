import './../dist/output.css';

import {SocketProvider} from './context/SocketContext'; 
import {DataProvider} from './context/DataContext'; 

import AppContent from './AppContent';


function App() {
  return (
    <DataProvider>
      <SocketProvider>
        <AppContent />
      </SocketProvider>
    </DataProvider>
  );
}

export default App;
