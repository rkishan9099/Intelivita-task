import { useState } from 'react';
import { useUsers } from '../context/UserContext';
import { SearchBar } from './user/SearchBar';
import { UserTableData } from './user/UserTableData';
import { Pagination } from './user/Pagination';
import { NoRecords } from './user/NoRecords';

export function UserList() {
  const {
    users,
    deleteUser,
    updateUser,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    itemsPerPage
  } = useUsers();
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const filteredUsers = users.filter(user => 
    user.id.toString().includes(searchTerm) ||
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (user: typeof users[0]) => {
    setEditingId(user.id);
    setEditForm({ name: user.name, email: user.email });
  };

  const handleUpdate = (id: number) => {
    updateUser({ id, ...editForm });
    setEditingId(null);
  };

  return (
    <div className="w-full">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {filteredUsers.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <NoRecords />
        </div>
      ) : (
        <>
          <UserTableData
            users={currentUsers}
            editingId={editingId}
            editForm={editForm}
            setEditForm={setEditForm}
            handleEdit={handleEdit}
            handleUpdate={handleUpdate}
            deleteUser={deleteUser}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}