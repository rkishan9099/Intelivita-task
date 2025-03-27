import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';
import { mergeJSONData } from '../utils/jsonHelper';

const LOCAL_STORAGE_KEY = 'user-management-data';

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserContextType {
    users: User[];
    currentPage: number;
    itemsPerPage: number;
    searchTerm: string;
    editingUser: User | null;
    setUsers: (users: User[]) => void;
    addUsers: (users: User[]) => void;
    updateUser: (updatedUser: User) => void;
    deleteUser: (id: number) => void;
    setCurrentPage: (page: number) => void;
    setSearchTerm: (term: string) => void;
    setEditingUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState<User[]>(() => {
        const savedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
        return savedUsers ? JSON.parse(savedUsers) : [];
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const itemsPerPage = 5;

    // Save to localStorage whenever users change
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
    }, [users]);

    const addUsers = (newUsers: User[]) => {
        const { mergedData, duplicatesRemoved } = mergeJSONData(users, newUsers);
        setUsers(mergedData);
        
        toast.success(`Added ${newUsers.length - duplicatesRemoved} users`);
        if (duplicatesRemoved > 0) {
            toast.error(`Skipped ${duplicatesRemoved} duplicate emails`);
        }
    };

    const updateUser = (updatedUser: User) => {
        const emailExists = users.some(u => 
            u.email === updatedUser.email && u.id !== updatedUser.id
        );
        
        if (emailExists) {
            toast.error('Email already exists');
            return;
        }
        
        setUsers(users.map(user =>
            user.id === updatedUser.id ? updatedUser : user
        ));
        toast.success('User updated successfully');
    };

    const deleteUser = (id: number) => {
        setUsers(users.filter(user => user.id !== id));
        toast.success('User deleted successfully');
    };

    const value = {
        users,
        currentPage,
        itemsPerPage,
        searchTerm,
        editingUser,
        setUsers,
        addUsers,
        updateUser,
        deleteUser,
        setCurrentPage,
        setSearchTerm,
        setEditingUser,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export const useUsers = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUsers must be used within a UserProvider');
    }
    return context;
};
