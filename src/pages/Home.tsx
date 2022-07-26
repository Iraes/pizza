import { FC, useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import Categories from "../components/Categories";
import SortPopup, { list } from "../components/Sort";
import MyLoader from "../components/UI/MyLoader";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/UI/Pagination";
import FilterSlice, {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../components/redux/slices/filterSlice";
import {
  fetchPizzas,
  selectPizzaData,
} from "../components/redux/slices/pizzaSlice";
import { useAppDispatch } from "../components/redux/store";
import {
  FetchPizzasArgs,
  IFilterSliceState,
  Sort,
} from "../components/redux/@types";

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const getPizzas = async (): Promise<void> => {
    const category = categoryId ? `&category=${categoryId}` : "";
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    /*
    Проблема нерабочего поиска и сортировки одновременно - это проблема mokapi (бэкенда)
    На нормальном бэкенде и поиск и сортировка будет работать нормально
     */
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        category,
        order,
        sortBy,
        search,
        currentPage,
      })
    );

    window.scroll(0, 0);
  };

  // При первом рендере проверяем URL-араметры и сохраняем в редаксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as FetchPizzasArgs;
      const sort = list.find((obj) => obj.sortProperty === params.sortBy);
      dispatch(
        setFilters({
          currentPage: params.currentPage,
          sort: sort || list[0],
          searchValue: params.search,
          categoryId: Number(params.category),
        })
      );
      isSearch.current = true;
    }
  }, []);

  //Если был первый рендер, то отправляем запросы на пиццы
  useEffect(() => {
    getPizzas();
    // isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  //При первом ренедере не вшивать в URL-параметры никакие данные.
  //Параметры изменятся только если уже был первый рендер и есть какие
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        currentPage,
        categoryId,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, currentPage]);
  /*
  Вариант сортировки интемов на фронте. Применяется если имеем всегда статичный массив и мало итемов.
  Если же на странице отображаются не все итемы, то лучше делать запрос к бекэнду!!!!!
    const pizzas = items.filter((pizza) => {
       return pizza.title.toLowerCase().includes(searchValue.toLowerCase())
     })
     .map((pizza) => {
       return <PizzaBlock key={pizza.title} {...pizza} />;
     });
   */

  /*
  Вариант сортировки интемов на бэкэнде, нужен для получения всех нужных итемов с сервера.
  Особенно полезен, если на странице не хранятся все нужные итемы (скрыты пагинацией например)
   */
  const pizzas = items.map((pizza: any) => {
    return <PizzaBlock key={pizza.title} {...pizza} />;
  });

  const loader = [...new Array(6)].map((_, index) => <MyLoader key={index} />);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories category={categoryId} onChangeCategory={onChangeCategory} />
        <SortPopup />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>
            Ой, произошла ошибка! <span>😕</span>
          </h2>
          <p>
            Вероятней всего, мы не смогли получить список пицц.
            <br /> Подождите немного и обновите страницу.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? loader : pizzas}
        </div>
      )}
      <Pagination
        onChangePage={(number: number) => dispatch(setCurrentPage(number))}
      />
    </div>
  );
};

export default Home;
