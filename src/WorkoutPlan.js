export const WorkoutPlan = {
  warmup: [
    { 
      name: 'Arm Circles', 
      duration: 30, 
      icon: 'fa-solid fa-circle',
      description: 'Rotate arms in circular motions to warm up shoulder muscles'
    },
    { 
      name: 'Shoulder Rolls', 
      duration: 30, 
      icon: 'fa-solid fa-rotate',
      description: 'Gently roll shoulders forward and backward to release tension'
    },
    { 
      name: 'March in Place', 
      duration: 30, 
      icon: 'fa-solid fa-person-walking',
      description: 'Lift knees alternately to increase heart rate and warm up legs'
    },
    { 
      name: 'Side Lunges', 
      duration: 30, 
      icon: 'fa-solid fa-shoe-prints',
      description: 'Step side to side to stretch and warm up leg muscles'
    },
    { 
      name: 'Neck & Wrist Rolls', 
      duration: 30, 
      icon: 'fa-solid fa-hand',
      description: 'Gently rotate neck and wrists to improve mobility'
    }
  ],
  mainWorkout: {
    rounds: [
      {
        name: 'Lower Body Focus',
        exercises: [
          { 
            name: 'Squats', 
            work: 40, 
            rest: 20, 
            icon: 'fa-solid fa-person-running',
            description: 'Standard bodyweight squats to strengthen legs'
          },
          { 
            name: 'Lunges', 
            work: 40, 
            rest: 20, 
            icon: 'fa-solid fa-person-walking',
            description: 'Forward and backward lunges to target leg muscles'
          },
          { 
            name: 'Glute Bridges', 
            work: 40, 
            rest: 20, 
            icon: 'fa-solid fa-person-arrow-up-from-line',
            description: 'Lift hips to engage glutes and core'
          },
          { 
            name: 'Step-ups', 
            work: 40, 
            rest: 20, 
            icon: 'fa-solid fa-stairs',
            description: 'Use a step or sturdy platform to work leg muscles'
          },
          { 
            name: 'Wall Sit', 
            work: 40, 
            rest: 20, 
            icon: 'fa-solid fa-person-booth',
            description: 'Hold a seated position against a wall to build leg strength'
          }
        ]
      },
      {
        name: 'Upper Body & Core',
        exercises: [
          { 
            name: 'Push-ups', 
            work: 40, 
            rest: 20, 
            icon: 'fa-solid fa-person-walking',
            description: 'Standard or modified push-ups to build upper body strength'
          },
          { 
            name: 'Plank', 
            work: 40, 
            rest: 20, 
            icon: 'fa-solid fa-person-arrow-up-from-line',
            description: 'Hold a straight body position to engage core muscles'
          },
          { 
            name: 'Tricep Dips', 
            work: 40, 
            rest: 20, 
            icon: 'fa-solid fa-hand',
            description: 'Use a chair or bench to target tricep muscles'
          },
          { 
            name: 'Mountain Climbers', 
            work: 40, 
            rest: 20, 
            icon: 'fa-solid fa-person-running',
            description: 'Dynamic exercise combining cardio and core strength'
          },
          { 
            name: 'Russian Twists', 
            work: 40, 
            rest: 20, 
            icon: 'fa-solid fa-rotate',
            description: 'Seated twist to engage obliques and core'
          }
        ]
      }
    ]
  },
  cooldown: [
    { 
      name: 'Deep Breathing', 
      duration: 60, 
      icon: 'fa-solid fa-lungs',
      description: 'Slow, deep breaths to calm the body and mind'
    },
    { 
      name: 'Hamstring Stretch', 
      duration: 30, 
      icon: 'fa-solid fa-person-walking',
      description: 'Stretch back of thighs to improve flexibility'
    },
    { 
      name: 'Quadriceps Stretch', 
      duration: 30, 
      icon: 'fa-solid fa-person-running',
      description: 'Stretch front of thighs to reduce muscle tension'
    },
    { 
      name: 'Side Stretch', 
      duration: 30, 
      icon: 'fa-solid fa-person-arrow-up-from-line',
      description: 'Lateral stretch to release side body muscles'
    },
    { 
      name: 'Neck Stretch', 
      duration: 30, 
      icon: 'fa-solid fa-person-walking',
      description: 'Gentle neck stretches to release upper body tension'
    }
  ]
};
