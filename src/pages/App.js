import "./App.css";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "../services/constant/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Layout from "../components/Layout/BaseLayout";
import AlertContextProvider from "../../src/services/context/AlertContext/Provider";
import ArtistsPage from "./Artists";
import TopicsPage from "./Topics";
import CreateTopicPage from "./Topics/create";
import CategoriesPage from "./Categories";
import SkillsPage from "./Skills";
import BlogPage from "./Blog";
import ArtWorksPage from "./ArtWorks/index";
import LoginPage from "./login";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AlertContextProvider>
          <Router>
            <Route path="/login" render={() => <LoginPage />} />
            <Route
              path="/artists"
              render={() => (
                <Layout>
                  <ArtistsPage />
                </Layout>
              )}
            />
            <Route
              exact
              path="/topics"
              render={() => (
                <Layout>
                  <TopicsPage />
                </Layout>
              )}
            />
            <Route
              path="/topics/create"
              render={() => (
                <Layout>
                  <CreateTopicPage />
                </Layout>
              )}
            />

            <Route
              exact
              path="/categories"
              render={() => (
                <Layout>
                  <CategoriesPage />
                </Layout>
              )}
            />
            <Route
              path="/skills"
              render={() => (
                <Layout>
                  <SkillsPage />
                </Layout>
              )}
            />
            <Route
              exact
              path="/blog"
              render={() => (
                <Layout>
                  <BlogPage />
                </Layout>
              )}
            />
            <Route
              path="/artworks"
              render={() => (
                <Layout>
                  {" "}
                  <ArtWorksPage />{" "}
                </Layout>
              )}
            />
            <Route exact path="/" render={() => <Redirect to="/artists" />} />
          </Router>
        </AlertContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
