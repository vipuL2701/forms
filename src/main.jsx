import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store"; 

import RegistrationForm from "./RegistrationForm";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <RegistrationForm />
  </Provider>
);
