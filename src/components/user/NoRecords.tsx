export function NoRecords() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-center text-lg font-medium text-gray-900">No Records Found</p>
      <p className="text-center text-gray-500 mt-1">
        Upload a JSON file or try a different search term
      </p>
    </div>
  );
}