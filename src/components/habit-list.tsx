import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import type { Rootstate, AppDispatch } from "../store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { toggleHabit, removeHabit, type Habit } from "../store/habit-slice";

const HabitList: React.FC = () => {
  const { habits } = useSelector((state: Rootstate) => state.habits);
  const dispatch = useDispatch<AppDispatch>();
  const today = new Date().toISOString().split("T")[0];

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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}>
      {habits.map((habit) => (
        <Paper key={habit.id} elevation={3} sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid >
              <Typography variant="h6">{habit.name}</Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textTransform: "capitalize" }}
              >
                {habit.frequency}
              </Typography>
            </Grid>

            <Grid >
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                  variant="outlined"
                  color={
                    habit.completedDates.includes(today)
                      ? "success"
                      : "primary"
                  }
                  onClick={() =>
                    dispatch(toggleHabit({ id: habit.id, date: today }))
                  }
                  startIcon={<CheckCircleIcon />}
                >
                  {habit.completedDates.includes(today)
                    ? "Completed"
                    : "Mark Complete"}
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => dispatch(removeHabit(habit.id))}
                  startIcon={<DeleteIcon />}
                >
                  Remove
                </Button>
              </Box>
            </Grid>

            <Grid>
              <Typography variant="body2">
                Current Streak: {getStreak(habit)} days
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(getStreak(habit) / 30) * 100}
                sx={{ mt: 1 }}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};

export default HabitList;
