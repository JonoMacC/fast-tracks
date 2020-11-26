import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Layout from "./Layout";

const PrivateRoute = ({ component: Component }) => {
  const [auth] = useContext(AuthContext);

  // if loading is set to true, render loading text
  if (auth.loading) {
    return (
      <Route
        render={() => {
          return (
            <Layout>
              <section className="Screen">
                <h2>Loading...</h2>
              </section>
            </Layout>
          );
        }}
      />
    );
  }

  // if the user has authorization render the component,
  // otherwise redirect to the login screen
  return auth.data ? <Component /> : <Redirect to="/login" />;
};

export default PrivateRoute;
