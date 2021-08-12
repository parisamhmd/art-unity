import './App.css';
import { Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
const useStyles = makeStyles({
    button: {
        backgroundColor: "pink "
    }
})
function App() {
    const classes = useStyles();
    return (
        <div style={{ height: "100vh" }}>
            <Button className={classes.button}>sdfsdfd</Button>
        </div>
    );
}

export default App;
