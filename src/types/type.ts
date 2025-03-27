export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export interface DataContextType {
    data: User[];
    setSearch:(term: string) => void;
    totalPages: number;
  }