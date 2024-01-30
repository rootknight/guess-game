"use client";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ placeholder }: { placeholder?: string }) => {
  const searchParames = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParames);
    params.set("page", "1");
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 1000);

  return (
    <div>
      <Input
        labelPlacement="outside-left"
        placeholder={placeholder}
        // value={searchParames.get("query")?.toString()}
        onValueChange={handleSearch}
        defaultValue={searchParames.get("query")?.toString()}
        className="w-full"
        startContent={<AiOutlineSearch />}
      />
    </div>
  );
};

export default Search;
