import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { tableCellClasses } from "@mui/material/TableCell";
import { TextField } from "@mui/material";
import { red ,blue } from "@mui/material/colors";
import { createTheme } from "@mui/material";
const title = " Tender's Title";
const bidno = "AASTUbid1/2014";
const SupplierName = "Warit Furniture";
const submissionDate = "12/2/2014";

const theme = createTheme({
    palette: {
      primary: blue,
      secondary: red
    }
  });

function BidFormGoods(props) {
  return (
      <form>

    <Container
      maxWidth="lg"
      backgroundcolor="gray"
      sx={{ mt: 4, mb: 4, ml: 15 }}
      >
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              minHeight: 1000,
            }}
            >
            <Typography component="h1" variant="h5">
              {title}
            </Typography>
            <TableContainer component={Paper} sx={{ minWidth: 650, mt: 5 }}>
              <Table
                sx={{
                    minWidth: 650,
                    
                }}
                aria-label="simple table"
                >
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ width: 250 }}>Bid No</TableCell>
                    <TableCell align="left">{bidno}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>SupplierName</TableCell>
                    <TableCell align="left">{SupplierName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>submissionDate</TableCell>
                    <TableCell align="left">{submissionDate}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer
              component={Paper}
              sx={{ minWidth: 650, mb: 2 }}
              >
              <Table sx={{ minWidth: 650, [`& .${tableCellClasses.root}`]: {
                  borderBottom: "none",
                }, }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ width: 250 }}>Lot No</TableCell>
                    <TableCell align="left" sx={{ width: 250 }}>
                      <TextField
                        required
                        id="standard-required"
                        label="Required"
                        defaultValue=""
                        variant="standard"
                        />
                    </TableCell>
                  
                    <TableCell sx={{ width: 100 }}>Item Number</TableCell>
                    <TableCell align="left" sx={{ width: 250 }}><TextField
                        required
                        id="standard-required"
                        label="Required"
                        defaultValue=""
                        variant="standard"
                        /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ width: 250 }}>Name of the Good</TableCell>
                    <TableCell align="left"><TextField
                        required
                        id="standard-required"
                        label="Required"
                        defaultValue=""
                        variant="standard"
                        sx={{ minWidth: 500 }}
                      /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ width: 250 }}>Country of Origin</TableCell>
                    <TableCell align="left">
                    <TextField
                        required
                        id="standard-required"
                        label="Required"
                        defaultValue=""
                        variant="standard"
                        sx={{ minWidth: 500 }}
                        />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ width: 250 }}>Model Or Brand</TableCell>
                    <TableCell align="left">
                    <TextField
                        required
                        id="standard-required"
                        label="Required"
                        defaultValue=""
                        variant="standard"
                        sx={{ minWidth: 500 }}
                        />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ width: 250 }}>Unit Of Measure</TableCell>
                    <TableCell align="left">
                    <TextField
                        required
                        id="standard-required"
                        label="Required"
                        defaultValue=""
                        variant="standard"
                        sx={{ minWidth: 500 }}
                        />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ width: 250 }}>Quantity</TableCell>
                    <TableCell align="left">
                    <TextField
                        required
                        id="standard-required"
                        label="Required"
                        defaultValue=""
                        variant="standard"
                        sx={{ minWidth: 500 }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ width: 250 }}>Price per Unit</TableCell>
                    <TableCell align="left">
                    <TextField
                        required
                        id="standard-required"
                        label="Required"
                        defaultValue=""
                        variant="standard"
                        sx={{ minWidth: 500 }}
                        />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ width: 250 }}>Total Price</TableCell>
                    <TableCell align="left">
                    <TextField
                        required
                        id="standard-required"
                        label="Required"
                        defaultValue=""
                        variant="standard"
                        sx={{ minWidth: 500 }}
                        />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Paper
            sx={{
                p: 2,
                display: "flex",
                flexDirection: "row",
                
            }}
          >
            <Button type="reset" variant="contained" align="center" color="secondary" sx={{ mb: 4, width: 100, ml: 100 }}>
              Clear
            </Button>
            <Button variant="contained" align="center" sx={{ mb: 4 , width: 100 , ml: 5 }}>
                Submit
            </Button>
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </Container>
            </form>
  );
}

export default BidFormGoods;
