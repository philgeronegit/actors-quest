import { useDebounce } from "@uidotdev/usehooks";
import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

type SearchButtonProps = {
  onChange: (searchTerm: string) => void;
};

const SearchButton = ({ onChange }: SearchButtonProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (debouncedSearchTerm.length >= 3) {
      onChange(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onChange]);

  return (
    <TextInput
      type="text"
      rightIcon={HiMiniMagnifyingGlass}
      placeholder="Recherchez un acteur"
      value={searchTerm}
      onChange={handleChange}
      required
    />
  );
};

export default SearchButton;
