"use client";
import { Input } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "@/hooks/useDebounce";

const Search = ({ placeholder }: { placeholder?: string }) => {
  const searchParames = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParames.toString());
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
        startContent={<div className="icon-[octicon--search-16]" />}
      />
    </div>
  );
};

export default Search;
