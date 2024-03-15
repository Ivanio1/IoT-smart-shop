import React from "react";
import { observer } from "mobx-react";

import { useStores } from "stores/useStores";
import { IUser } from "stores/UserStore";

import LayoutDefault from "components/LayoutDefault";
import App from "./App";

const HomePage = observer(() => {
  const user: IUser = useStores()["UserStore"].user;

  return (
    <LayoutDefault>
      {!user && <div><h1>Войдите в систему!</h1></div>}
      {user && <App/>}
    </LayoutDefault>
  );
});

export default HomePage;
