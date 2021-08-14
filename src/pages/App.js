import "./App.css";
import { makeStyles, ThemeProvider } from "@material-ui/core";
import { theme } from "../services/constant/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ArtistsPage from "./Artists";
import TopicsPage from "./Topics";
import LayersPage from "./Layers";
import SkillsPage from "./Skills";
import BlogPage from "./Blog";
import ArtWorksPage from "./ArtWorks/index";

const useStyles = makeStyles({
  button: {
    backgroundColor: "pink ",
  },
});
function App() {
  const classes = useStyles();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <Route
            path="/artists"
            render={() => (
              <Layout>
                <ArtistsPage />
              </Layout>
            )}
          />
          <Route
            path="/topics"
            render={() => (
              <Layout>
                <TopicsPage />
              </Layout>
            )}
          />
          <Route
            exact
            path="/layers"
            render={() => (
              <Layout>
                <LayersPage />
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
          <Route path="/" render={() => <Redirect to="/artists" />} />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
