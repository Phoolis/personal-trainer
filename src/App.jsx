import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";
import TrainingCalendar from "./components/TrainingCalendar";
import { TrainingsProvider } from "./components/TrainingsContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TrainingsProvider>
          <Router>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6">Personal Trainer</Typography>
                <Box sx={{ display: "flex", marginLeft: "4em", gap: 4 }}>
                  <Button color="inherit" component={Link} to="/customers">
                    Customers
                  </Button>
                  <Button color="inherit" component={Link} to="/trainings">
                    Trainings
                  </Button>
                  <Button color="inherit" component={Link} to="/calendar">
                    Calendar
                  </Button>
                </Box>
              </Toolbar>
            </AppBar>
            <Container maxWidth="x1" sx={{ mt: 1, mb: 1 }}>
              <Routes>
                <Route path="/" element={<CustomerList />} />
                <Route path="/customers" element={<CustomerList />} />
                <Route path="/trainings" element={<TrainingList />} />
                <Route path="/calendar" element={<TrainingCalendar />} />
              </Routes>
            </Container>
          </Router>
        </TrainingsProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
