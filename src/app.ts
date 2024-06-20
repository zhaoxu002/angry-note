import { PropsWithChildren } from "react";
import {
  useLaunch,
  useError,
  useUnhandledRejection,
  cloud,
} from "@tarojs/taro";
import "./app.scss";

function App({ children }: PropsWithChildren<any>) {
  useError((error) => console.error(error));
  useUnhandledRejection((error) => console.error(error));
  useLaunch(() => {
    console.log("App launched.");

    cloud.init({
      env: "prod-8glye1af1e675f53",
    });
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
