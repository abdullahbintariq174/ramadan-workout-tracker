const WorkoutPlan = {
  warmup: {
    name: "Warm-up",
    icon: "fire",
    exercises: [
      { name: "Arm Circles", icon: "sync", duration: 30 },
      { name: "Shoulder Rolls", icon: "sync", duration: 30 },
      { name: "March in Place", icon: "walking", duration: 30 },
      { name: "Side Lunges", icon: "arrows-alt-h", duration: 30 },
      { name: "Neck & Wrist Rolls", icon: "sync", duration: 30 },
      // Repeat for second round
      { name: "Arm Circles", icon: "sync", duration: 30 },
      { name: "Shoulder Rolls", icon: "sync", duration: 30 },
      { name: "March in Place", icon: "walking", duration: 30 },
      { name: "Side Lunges", icon: "arrows-alt-h", duration: 30 },
      { name: "Neck & Wrist Rolls", icon: "sync", duration: 30 }
    ]
  },
  mainWorkout: {
    name: "Main Workout",
    icon: "dumbbell",
    rounds: [
      {
        name: "Lower Body Focus",
        exercises: [
          { name: "Squats", icon: "chevron-down", workDuration: 40, restDuration: 20 },
          { name: "Lunges", icon: "shoes", workDuration: 40, restDuration: 20 },
          { name: "Calf Raises", icon: "arrow-up", workDuration: 40, restDuration: 20 },
          { name: "Glute Bridges", icon: "chevron-up", workDuration: 40, restDuration: 20 },
          { name: "Side Leg Raises", icon: "arrows-alt-h", workDuration: 40, restDuration: 20 }
        ]
      },
      {
        name: "Upper Body & Core",
        exercises: [
          { name: "Push-ups", icon: "arrow-down", workDuration: 40, restDuration: 20 },
          { name: "Plank", icon: "hand-paper", workDuration: 40, restDuration: 20 },
          { name: "Tricep Dips", icon: "arrow-down", workDuration: 40, restDuration: 20 },
          { name: "Mountain Climbers", icon: "mountain", workDuration: 40, restDuration: 20 },
          { name: "Shoulder Taps", icon: "hand", workDuration: 40, restDuration: 20 }
        ]
      },
      {
        name: "Cardio & Full Body",
        exercises: [
          { name: "Jumping Jacks", icon: "expand", workDuration: 40, restDuration: 20 },
          { name: "High Knees", icon: "running", workDuration: 40, restDuration: 20 },
          { name: "Burpees", icon: "level-up-alt", workDuration: 40, restDuration: 20 },
          { name: "Mountain Climbers", icon: "mountain", workDuration: 40, restDuration: 20 },
          { name: "Plank Jacks", icon: "expand", workDuration: 40, restDuration: 20 }
        ]
      },
      {
        name: "Core & Cooldown Start",
        exercises: [
          { name: "Crunches", icon: "compress", workDuration: 40, restDuration: 20 },
          { name: "Russian Twists", icon: "sync", workDuration: 40, restDuration: 20 },
          { name: "Plank", icon: "hand-paper", workDuration: 40, restDuration: 20 },
          { name: "Leg Raises", icon: "arrow-up", workDuration: 40, restDuration: 20 },
          { name: "Slow Mountain Climbers", icon: "mountain", workDuration: 40, restDuration: 20 }
        ]
      }
    ],
    restBetweenRounds: 60
  },
  cooldown: {
    name: "Cool-down",
    icon: "wind",
    exercises: [
      { name: "Deep Breathing", icon: "cloud", duration: 60 },
      { name: "Hamstring Stretch", icon: "arrow-down", duration: 30 },
      { name: "Quadriceps Stretch", icon: "arrow-up", duration: 30 },
      { name: "Side Stretch", icon: "arrows-alt-h", duration: 30 },
      { name: "Neck Stretch", icon: "head", duration: 30 }
    ]
  }
};

// Phase mapping
export const phases = [
  { name: "warmup", label: "Warm-up", totalTime: 300 }, // 5 minutes
  { name: "mainWorkout", label: "Main Workout", totalTime: 1200 }, // 20 minutes
  { name: "cooldown", label: "Cool-down", totalTime: 300 } // 5 minutes
];

export default WorkoutPlan;
