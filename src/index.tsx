import ReactDOM  from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {store} from "./components/redux/store";
import {Provider} from "react-redux";

const rootElem = document.getElementById("root") as HTMLElement;

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  );
}
