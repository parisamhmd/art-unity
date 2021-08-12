import "./App.css";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { QueryClient, QueryClientProvider } from "react-query";
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
      <div style={{ height: "100vh" }}>
        <Button className={classes.button}>sdfsdfd</Button>
      </div>
    </QueryClientProvider>
  );
}

export default App;
