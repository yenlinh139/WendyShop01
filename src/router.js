import { Routes, Route } from "react-router-dom";
import HomePage from "pages/HomePage";
import ProfilePage from "pages/ProfilePage";
import DataPage from "pages/DataPage";
import StorePage from "pages/StorePage";
import { ROUTERS } from "utils/router";
import MasterLayout from "pages/theme/masterLayout";

const renderUserRouter = () => {
  const userRouters = [
    {
      path: ROUTERS.USER.HOME,
      component: <HomePage />,
    },
    {
      path: ROUTERS.USER.DATA,
      component: <DataPage />,
    },
    {
      path: ROUTERS.USER.STORE,
      component: <StorePage />,
    },
    {
      path: ROUTERS.USER.PROFILE,
      component: <ProfilePage />,
    },
  ];

  return (
    <MasterLayout>
      <Routes>
        {userRouters.map((item, key) => (
          <Route key={key} path={item.path} element={item.component} />
        ))}
      </Routes>
    </MasterLayout>
  );
};

const RouterCustom = () => {
  return renderUserRouter();
};

export default RouterCustom;
