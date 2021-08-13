import "./App.css";
import { makeStyles, ThemeProvider } from "@material-ui/core";
import { theme } from "../services/constant/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "../components/Layout/Layout.jsx";
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
        <Layout>How are you</Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
