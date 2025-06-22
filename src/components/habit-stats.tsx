import React, { useEffect } from "react";
import type { AppDispatch, Rootstate } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits, type Habit } from "../store/habit-slice";
import {
  Box,
  Grid,
  Paper,
  Typography,
  LinearProgress,
  Card,
  CardContent,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ListAltIcon from "@mui/icons-material/ListAlt";

const HabitStats: React.FC = () => {
  const { habits, isLoading, error } = useSelector(
    (state: Rootstate) => state.habits
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  const today = new Date().toISOString().split("T")[0];

  const getTotalHabits = () => habits.length;

  const getCompletedToday = () =>
    habits.filter((habit) => habit.completedDates.includes(today)).length;

  const getLongestStreak = () => {
    const getStreak = (habit: Habit) => {
      let streak = 0;
      const currentDate = new Date();

      while (true) {
        const dateString = currentDate.toISOString().split("T")[0];
        if (habit.completedDates.includes(dateString)) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }

      return streak;
    };

    return Math.max(...habits.map(getStreak), 0);
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        📊 Habit Statistics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card elevation={4} sx={{ backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ListAltIcon color="primary" />
                <Typography variant="subtitle1">Total Habits</Typography>
              </Box>
              <Typography variant="h6" sx={{ mt: 1 }}>
                {getTotalHabits()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card elevation={4} sx={{ backgroundColor: "#e8f5e9" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CheckCircleIcon color="success" />
                <Typography variant="subtitle1">Completed Today</Typography>
              </Box>
              <Typography variant="h6" sx={{ mt: 1 }}>
                {getCompletedToday()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card elevation={4} sx={{ backgroundColor: "#fff3e0" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmojiEventsIcon color="warning" />
                <Typography variant="subtitle1">Longest Streak</Typography>
              </Box>
              <Typography variant="h6" sx={{ mt: 1 }}>
                {getLongestStreak()} days
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HabitStats;
