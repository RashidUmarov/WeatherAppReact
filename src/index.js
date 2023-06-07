console.log('Hello from Weather App');
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

import App from "./components/App";
//console.log('Hello, World');

//ReactDOM.render(<App/>, document.getElementById("root"));
const root = createRoot(document.getElementById("root"));
root.render(<App />);