import { PageLayout } from "./Layout";
import { routerBasePath } from "../util/routerBasePath";

export const Login = () => (
  <PageLayout>
    <div className="Screen">
      <div className="titleText">
        <span className="title">Fast Tracks</span>
        <p className="subtitle">Discover new music now.</p>
      </div>
      <a href={`${routerBasePath}/login`} className="Btn large label rounded">
        Log In With Spotify
      </a>
    </div>
  </PageLayout>
);

export default Login;
