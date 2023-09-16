import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles({
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    background: "#FFF",
    height: "auto",
    width: "auto",
    padding: 20,
  },
  box: {
    padding: 20,
    margin: 10,
    background: "#FFF",
    width: 800,
    height: "auto",
    borderRadius: 10,
  },
  headingStyle: {
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "Poppins",
    letterSpacing: 1,
  },
  rowStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
