import classes from "./TopBar.module.scss";
import Input from "@/@components/Input/Input";

type TopBarProps = {
  query: string;
  setQuery: (query: string) => void;
};

const TopBar = ({ query, setQuery }: TopBarProps) => {
  return (
    <div className={`${classes.topBar} d-flex justify-center align-center`}>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        name="name"
        placeholder="Enter a movie name..."
      />
    </div>
  );
};

export default TopBar;
