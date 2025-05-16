
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  searchQuery, 
  setSearchQuery,
  placeholder = "ابحث عن طعام، بقالة، أو أدوية..."
}) => {
  return (
    <div className="relative">
      <Input 
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pr-10 h-12 bg-white border border-gray-200 rounded-full focus-visible:ring-gray-400 shadow-sm text-sm"
      />
      <button className="absolute top-1/2 right-3 -translate-y-1/2">
        <Search className="h-5 w-5 text-gray-500" />
      </button>
    </div>
  );
};

export default SearchInput;
