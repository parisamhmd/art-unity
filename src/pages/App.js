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
import SingleTopicPage from "./Topics/detail";
import CategoriesPage from "./Categories";
import CreateCategoryPage from "./Categories/create";
import SingleCategoryPage from "./Categories/detail";
import SkillsPage from "./Skills";
import CreateSkillsPage from "./Skills/create";
import SingleSkillsPage from "./Skills/detail";
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
            {/* Topics */}
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
              path="/topics/:id"
              render={() => (
                <Layout>
                  <SingleTopicPage />
                </Layout>
              )}
            />
            {/* Category */}
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
              path="/categories/create"
              render={() => (
                <Layout>
                  <CreateCategoryPage />
                </Layout>
              )}
            />
            <Route
              path="/categories/:id"
              render={() => (
                <Layout>
                  <SingleCategoryPage />
                </Layout>
              )}
            />
            {/* Occupation */}
            <Route
              exact
              path="/skills"
              render={() => (
                <Layout>
                  <SkillsPage />
                </Layout>
              )}
            />
            <Route
              path="/skills/create"
              render={() => (
                <Layout>
                  <CreateSkillsPage />
                </Layout>
              )}
            />
            <Route
              path="/skills/:id"
              render={() => (
                <Layout>
                  <SingleSkillsPage />
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
