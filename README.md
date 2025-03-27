# User Management Application

## 1. Project Setup

### Create a new Vite project with React and TypeScript
```sh
npm create vite@latest . -- --template react-ts
```

### Install dependencies
```sh
npm install
```

### Install additional packages
```sh
npm install react-hot-toast
npm install -D tailwindcss@3 postcss autoprefixer
```

## 2. Tailwind CSS Setup

### Initialize Tailwind CSS
```sh
npx tailwindcss init -p
```

## 3. Project Structure
```
src/
  components/
    FileUpload.tsx    # For file upload
    UserList.tsx      # For displaying user list
  context/
    UserContext.tsx   # For managing user data
  type/
    type.ts          # Define types
  utils/
    jsonHelper.ts    # For JSON data-related operations
```

## 4. Implementation

### A. Create Context
- Import necessary hooks and dependencies.
- Define the User type and context structure.
- Use `useState` to manage user data, search, pagination, and editing states.
- Implement functions for adding, updating, and deleting users.
- Store and retrieve user data from `localStorage`.
- Wrap children components with `UserContext.Provider`.
- Export `UserContext` and `useUserContext` hook.
- Use `localStorage` for data persistence.
- Use `useEffect` with an empty dependency array for initial data load from `localStorage`.
- Use `useState` for managing user data, search, pagination, and editing states.

### jsonHelper.ts

#### 1. `isValidJSONFormat(data: any): boolean`
- Checks if the uploaded JSON file has a valid format.

#### 2. `removeDuplicatesByEmail(data: User[])`
- Removes duplicate user data based on email.
- Uses a `Set<string>` to track unique emails.
- Iterates through the input array:
  - If the email is new, adds the user to `uniqueData`.
  - If the email is already in the `Set`, increments `duplicatesRemoved`.

#### 3. `mergeJSONData(existingData: User[], newData: User[])`
- Merges an existing user list with new user data while ensuring no duplicate emails.
- Combines `existingData` and `newData` into a single array.
- Calls `removeDuplicatesByEmail()` to filter out duplicate emails.

## UI Components

### 1. FileUpload

#### Functionality

##### `processFiles`
- Converts `FileList` into an array.
- Loops through each file and:
  - Checks if it’s a JSON file.
  - Reads the file and parses the content.
  - Validates JSON format using `isValidJSONFormat`.
  - Removes duplicate emails using `removeDuplicatesByEmail`.
  - Displays errors or success messages using `toast`.

##### File Upload Handling (`handleFileUpload`)
- Triggered when a user selects files via the file input.
- Calls `processFiles()` with selected files.
- Resets the input (`event.target.value = ''`) to allow re-uploading the same file.

##### Drag & Drop Events (`handleDragOver`, `handleDragLeave`, `handleDrop`)
- `handleDragOver`: Prevents default behavior and sets `isDragging` state.
- `handleDragLeave`: Resets `isDragging` when the user drags out.
- `handleDrop`: Processes dropped files and resets `isDragging`.

### 2. UserList.tsx

#### Fetching Users
- Retrieves user data from the `useUsers` context.
- Manages the current page, search term, and number of users per page.

#### Filtering Users
- Users are filtered based on the search term entered in the `SearchBar`.
- The search term is matched against the user's ID, name, or email.

#### Displaying Users
- If no matching users are found, displays a `NoRecords` message.
- Otherwise, displays user data using `UserTableData`.

#### Editing a User
- Clicking the edit button enables input fields for updating the name or email.
- After modifying the details, clicking "Save" updates the user data.

#### Deleting a User
- Clicking the delete button removes the user from the list.

#### Pagination
- The `Pagination` component allows users to navigate through pages.
- It calculates the total number of pages and updates the current page accordingly.

### 3. Pagination Component

#### For Small Page Counts (≤5 Pages):
- Displays all page numbers without ellipsis.

#### For Large Page Counts (>5 Pages):
- Always shows the **first and last** page numbers.
- Shows the **current page and its immediate neighbors** (previous & next).
- Uses **ellipses (`...`)** to indicate skipped pages.

## main.tsx

```tsx
<StrictMode>
  <UserProvider>
    <App />
  </UserProvider>
</StrictMode>
```

- Provides `UserContext` for the app, allowing state management globally.

