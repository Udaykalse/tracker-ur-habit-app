import React, { useEffect } from "react";
import type { AppDispatch, Rootstate } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits, type Habit } from "../store/habit-slice";
import {
  Box,
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

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 3,
          justifyContent: "space-between",
        }}
      >
        {[{
          title: "Total Habits",
          value: getTotalHabits(),
          icon: <ListAltIcon color="primary" />,
          bgColor: "#f5f5f5",
        }, {
          title: "Completed Today",
          value: getCompletedToday(),
          icon: <CheckCircleIcon color="success" />,
          bgColor: "#e8f5e9",
        }, {
          title: "Longest Streak",
          value: `${getLongestStreak()} days`,
          icon: <EmojiEventsIcon color="warning" />,
          bgColor: "#fff3e0",
        }].map(({ title, value, icon, bgColor }) => (
          <Card
            key={title}
            elevation={4}
            sx={{
              backgroundColor: bgColor,
              flex: "1 1 0",
              minWidth: 0,
              // To keep equal width and allow responsiveness
            }}
          >
            <CardContent
              sx={{
                textAlign: { xs: "center", sm: "left" },
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {icon}
                <Typography variant="subtitle1">{title}</Typography>
              </Box>
              <Typography variant="h6">{value}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default HabitStats;
