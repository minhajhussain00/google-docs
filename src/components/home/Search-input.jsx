import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { SearchIcon, XIcon } from "lucide-react";
import { useSearchParam } from "@/hooks/use-search";

const SearchInput = () => {
  const [search, setSearch] = useSearchParam("search");
  const [value, setValue] = useState(search || "");
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <form className="relative max-w-[770px] w-full" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          className="search-input w-full md:text-xl placeholder:text-neutral-700 border-none bg-[#F0F4F8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white px-15 py-15"
          placeholder="Search"
        />
        <Button
          type="submit"
          variant="ghost"
          className="absolute left-1 top-1/2 -translate-y-1/2 [&_svg]:size-6 rounded-full"
        >
          <SearchIcon className="size-3 " />
        </Button>
        {value && (
          <Button
            type="button"
            variant="ghost"
            className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-6 rounded-full"
            onClick={() => {
              setValue("");
              setSearch("");
              inputRef.current?.blur();
            }}
          >
            <XIcon className="size-4 " />
          </Button>
        )}
      </form>
    </div>
  );
};

export default SearchInput;
