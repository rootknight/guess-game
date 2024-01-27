import { Input } from "@nextui-org/react";
import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
  return (
    <Input
      isClearable
      labelPlacement="outside-left"
      placeholder="查找词组..."
      className="w-full"
      startContent={<AiOutlineSearch />}
    />
  );
};

export default Search;
