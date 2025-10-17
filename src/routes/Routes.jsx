import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import * as Config from "../constants/Config";
import SkeletonLoader from "../components/SkeletonLoader/SkeletonLoader";
const Home = lazy(() => import("../pages/Home"));
const Catalog = lazy(() => import("../pages/Catalog"));
const Detail = lazy(() => import("../pages/detail/Detail"));

const Routes = () => {
  return (
    <Suspense fallback={<SkeletonLoader count={6} height={180} style={{ padding: 16 }} />}>
      <Switch>
        <Route
          path={`/:category/search/:keyword`}
          component={Catalog}
        />
        <Route path={`/:category/:id`} component={Detail} />
        <Route path={`/:category`} component={Catalog} />
        <Route path={`${Config.HOME_PAGE}`} exact component={Home} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
