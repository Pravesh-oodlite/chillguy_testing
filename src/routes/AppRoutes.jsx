import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./routeConstant";
import ProtectedRoute from "./ProtectedRoute";
import Loader from "@/components/Loader";

const Home = lazy(() => import("../pages/homePage/Home"));
const PlayQuiz = lazy(() => import("../pages/playQuizPage/PlayQuiz"));
const LeaderBoard = lazy(() =>
  import("../pages/leaderBoardPage/LeaderBoard").then((module) => ({
    default: module.LeaderBoard,
  }))
);
const NotFound = lazy(() => import("@/components/NotFound"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route
            path={ROUTES.PLAYQUIZ}
            element={
              <ProtectedRoute>
                <PlayQuiz />
              </ProtectedRoute>
            }
          />
          <Route path={ROUTES.LEADERBOARD} element={<LeaderBoard />} />
          <Route path={ROUTES.NOTFOUND} element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
