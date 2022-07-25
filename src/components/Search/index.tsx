import s from "./Search.module.scss"
import {FC, useCallback, useEffect, useRef, useState} from "react";
import debounce from "lodash.debounce";
import {setSearchValue} from "../redux/slices/filterSlice";
import {useDispatch} from "react-redux";


const Search: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  const updateSearchValue = useCallback(debounce((str) => {
    dispatch(setSearchValue(str));
  }, 550), [])

  const onChangeInput = (value:string) => {
    setInputValue(value);
    updateSearchValue(value);
  }

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Поиск пиццы ..."
      value={inputValue}
      className={s.input}
      onChange={(e) => onChangeInput(e.target.value) }
    />
  );
};

export default Search;