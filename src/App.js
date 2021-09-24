import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Home from "./component/Home";
import LoginForm from "./component/Login";
import NotFound from "./component/NotFound";
import Signup from "./component/Signup";
import ForgetPassword from "./component/ForgetPassword";
import ProtectedRoute from "./component/ProtectedRoute";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/signUp" component={Signup} />
      <Route exact path="/forgetPass" component={ForgetPassword} />
      <ProtectedRoute exact path="/" component={Home} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
);

export default App;
