import './App.css'
import { FileUpload } from './components/FileUpload';
import { UserList } from './components/UserList';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-6 text-gray-800">User Management</h1>
      
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Upload JSON Files</h2>
          <FileUpload />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold p-6 pb-0 text-gray-700">User List</h2>
          <div className="p-6">
            <UserList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
