import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles({
  mainContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    background: "#FFF",
    height: "auto",
    width: "auto",
    padding: 10,
  },
  box: {
    display: "grid",
    flexWrap: "wrap",
    margin: 10,
    background: "#FFF",
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
