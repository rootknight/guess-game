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
    console.log(`搜索... ${value}`);
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
    <Input
      isClearable
      labelPlacement="outside-left"
      placeholder={placeholder}
      // value={searchParames.get("query")?.toString()}
      onValueChange={handleSearch}
      defaultValue=""
      className="w-full"
      startContent={<AiOutlineSearch />}
    />
  );
};

export default Search;
