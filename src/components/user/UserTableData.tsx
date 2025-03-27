interface UserTableProps {
    users: Array<{ id: number; name: string; email: string }>;
    editingId: number | null;
    editForm: { name: string; email: string };
    setEditForm: (form: { name: string; email: string }) => void;
    handleEdit: (user: { id: number; name: string; email: string }) => void;
    handleUpdate: (id: number) => void;
    deleteUser: (id: number) => void;
}

export function UserTableData({
    users,
    editingId,
    editForm,
    setEditForm,
    handleEdit,
    handleUpdate,
    deleteUser
}: UserTableProps) {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users && users?.length>0 && users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {editingId === user.id ? (
                        <input
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : user.name}
                    </td>
                    <td className="hidden sm:table-cell px-4 py-3 text-sm text-gray-900">
                      {editingId === user.id ? (
                        <input
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : user.email}
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-medium space-x-2">
                      {editingId === user.id ? (
                        <button
                          onClick={() => handleUpdate(user.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(user)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
    );
}