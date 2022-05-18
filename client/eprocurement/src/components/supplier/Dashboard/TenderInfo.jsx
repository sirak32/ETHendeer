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

const title = " Tender's Title";
const bidno = "AASTUbid1/2014";
const invitationDate = "12/2/2014";
const objectofpro = "Chairs and Table";
const bidsubdate = "12/2/2014";
const bidopening = "13/2/2014";
const description =
  "Bidder has been debarred by a decision of the Public Procurement and Property Administration Agency from participating in public procurements for breach of its obligation under previous contracts, in accordance with ITB Clause 4.4.";

function TenderInfo(props) {
  return (
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
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ width: 250 }}>Bid No</TableCell>
                    <TableCell align="left">{bidno}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell >Invitation Date</TableCell>
                    <TableCell align="left">{invitationDate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Procurement Catagory</TableCell>
                    <TableCell align="left">Goods</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Procurement Method</TableCell>
                    <TableCell align="left">Open</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Object Of Procurement</TableCell>
                    <TableCell align="left">{objectofpro}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bid Submission Deadline</TableCell>
                    <TableCell align="left">{bidsubdate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bid Opening Schedule</TableCell>
                    <TableCell align="left">{bidopening}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer component={Paper} sx={{ minWidth: 650, mt: 5 , mb :2 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography component="h2" variant="h5">
                        Eligibility Requirment
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Bid Description</TableCell>
                    <TableCell align="left">
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Factor</TableCell>
                            <TableCell>Criteria</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              Debarred by a decision of the Public Procurement
                              and Property Authority
                            </TableCell>
                            <TableCell align="left">
                              <p>
                                Bidder has been debarred by a decision of the
                                Public Procurement and Property Administration
                                Agency from participating in public procurements
                                for breach of its obligation under previous
                                contracts, in accordance with ITB Clause 4.4.
                              </p>
                            </TableCell>
                          </TableRow>
                          <TableCell>Form Data on Joint Ventures</TableCell>
                          <TableCell>
                            <p>
                              In the case of a bid submitted by a joint venture
                              (JV), the Bidder has failed to submit the Form
                              Data on Joint Ventures, the Agreement governing
                              the formation of joint venture, or letter of
                              intent to form JV, including a draft agreement, in
                              accordance with ITB Clause 4.1
                            </p>
                          </TableCell>
                          <TableRow>
                            <TableCell>
                              VAT registration certificate for Domestic Bidders
                            </TableCell>
                            <TableCell>
                              <p>
                                Having been submitted VAT registration
                                certificate issued by the tax authority (in case
                                of contract value of Birr 100,000.00 and above)
                                in accordance with ITB Clause 4. 6(b)(ii)
                              </p>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Valid tax clearance certificate for Domestic
                              Bidders
                            </TableCell>
                            <TableCell>
                              <p>
                                Having been submitted valid tax clearance
                                certificate issued by the tax authority
                                (Domestic Bidders Only) in accordance with ITB
                                Clause 4.6(b)(iii
                              </p>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Valid business license</TableCell>
                            <TableCell>
                              <p>
                                Having been submitted valid trade license or
                                business organization registration certificate
                                issued by the country of establishment in
                                accordance with ITB Clause 4.6(b)(i)
                              </p>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bid Security Amount</TableCell>
                    <TableCell align="left">100,000 Birr</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bid Security Form</TableCell>
                    <TableCell align="left">Bank Guarantee</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Term and Condition</TableCell>
                    <TableCell align="left">
                      <p>
                        The University reserves the right to accept or reject
                        fully or partially any bids at any time prior to
                        contract,
                      </p>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button variant="contained" align="center" sx={{ mb :4 }}>Participate</Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default TenderInfo;
