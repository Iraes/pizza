import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import {FC} from "react";

const MyLayout: FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MyLayout;