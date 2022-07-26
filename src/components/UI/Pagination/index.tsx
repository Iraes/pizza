import ReactPaginate from "react-paginate";
import s from "./Pagination.module.scss"
import {useSelector} from "react-redux";
import {FC} from "react";
import {selectFilter} from "../../redux/slices/filterSlice";

const Pagination: FC<{onChangePage: (id: number) => void}> = ({onChangePage}) => {
  const {currentPage} = useSelector(selectFilter)
  return (
    <div>
      <ReactPaginate
        className={s.root}
        onPageChange={event => onChangePage(event.selected + 1)}
        pageCount={3}
        pageRangeDisplayed={8}
        previousLabel="<"
        nextLabel=">"
        forcePage={currentPage - 1}
      />
    </div>
  );
};

export default Pagination;