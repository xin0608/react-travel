import React, { useEffect } from 'react';
import styles from './App.module.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage, DetailPage, RegisterPage, SignInPage, SearchPage, ShoppingCartPage, PlaceOrderPage } from './pages';
import { Redirect } from 'react-router-dom';
import { useSelector } from './redux/hooks';
import { useDispatch } from "react-redux";
import { getShoppingCart } from "./redux/shoppingCart/slice";

// 搭建私有路由
const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  const routeComponent = (props) => {
    return isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: '/signin' }} />
    );
  }
  return <Route render={routeComponent} {...rest} />;
}


function App() {
  const jwt = useSelector(s => s.user.tooken);
  const flag = useSelector(s => s.user.flag);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (jwt) {
  //     dispatch(getShoppingCart(jwt));

  //   }
  // }, [jwt])

  useEffect(() => {
    if (flag) {
      dispatch(getShoppingCart());

    }
  }, [flag])


  // Switch可以从源头上解决页面叠加问题，一次只渲染一个页面
  // 注意组件顺序，优先级
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signin" component={SignInPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/detail/:touristRouteId" component={DetailPage} />
          <Route path="/search/:keywords?" component={SearchPage} />
          <PrivateRoute
            // isAuthenticated={jwt!==null}
            isAuthenticated={flag}
            path='/shoppingCart' component={ShoppingCartPage} />
          <PrivateRoute
            // isAuthenticated={jwt!==null}
            isAuthenticated={flag}
            path='/placeOrder' component={PlaceOrderPage} />
          <Route render={() => <h1>404 not found 页面去火星啦！</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
