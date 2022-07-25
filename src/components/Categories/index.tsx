import {FC} from "react";

type CategoriesProps = {
  category: number;
  onChangeCategory: (id: number) => void;
}

const Categories: FC<CategoriesProps>  = ({category, onChangeCategory}) => {
  const categories: Array<string> = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ]

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => {
          return (
            <li
              onClick={() => {onChangeCategory(index)}}
              className={ category === index ? "active" : ""}
              key={index}
            >
              {value}
            </li>
          )
        }
        )}
      </ul>
    </div>
  );
};

export default Categories;
