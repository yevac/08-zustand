import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearch: (value: string) => void;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      value={value}
      type="text"
      placeholder="Search notes"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
