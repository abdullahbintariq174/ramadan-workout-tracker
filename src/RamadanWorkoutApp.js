import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WorkoutPlan, { phases } from './WorkoutPlan';

const RamadanWorkoutApp = () => {
  // State variables
  const [screen, setScreen] = useState('initial'); // 'initial', 'workout', 'completion'
  const [currentTime, setCurrentTime] = useState(1800); // 30 minutes in seconds
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [currentExerciseTotalTime, setCurrentExerciseTotalTime] = useState(0);
  const [currentExerciseElapsedTime, setCurrentExerciseElapsedTime] = useState(0);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownNumber, setCountdownNumber] = useState(3);
  
  // Refs
  const timerRef = useRef(null);
  const phaseStartTimeRef = useRef(0);
  const phaseTotalTimeRef = useRef(0);
  
  // Helper Functions
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getRemainingPhaseTime = () => {
    const phaseEndTime = phases.slice(0, currentPhaseIndex + 1).reduce((total, p) => total + p.totalTime, 0);
    return phaseEndTime - (1800 - currentTime);
  };
  
  const updateExerciseInfo = () => {
    const phase = phases[currentPhaseIndex];
    phaseStartTimeRef.current = phases.slice(0, currentPhaseIndex).reduce((total, p) => total + p.totalTime, 0);
    phaseTotalTimeRef.current = phase.totalTime;
    
    if (phase.name === "warmup") {
      const exercise = WorkoutPlan.warmup.exercises[currentExerciseIndex];
      setCurrentExerciseTotalTime(exercise.duration);
    } else if (phase.name === "mainWorkout") {
      const round = WorkoutPlan.mainWorkout.rounds[currentRoundIndex];
      
      if (isResting && currentExerciseIndex === round.exercises.length) {
        // Rest between rounds
        setCurrentExerciseTotalTime(WorkoutPlan.mainWorkout.restBetweenRounds);
      } else if (isResting) {
        // Rest between exercises
        const exercise = round.exercises[currentExerciseIndex];
        setCurrentExerciseTotalTime(exercise.restDuration);
      } else {
        // Work period
        const exercise = round.exercises[currentExerciseIndex];
        setCurrentExerciseTotalTime(exercise.workDuration);
      }
    } else if (phase.name === "cooldown") {
      const exercise = WorkoutPlan.cooldown.exercises[currentExerciseIndex];
      setCurrentExerciseTotalTime(exercise.duration);
    }
  };
  
  const moveToNextExercise = () => {
    const phase = phases[currentPhaseIndex];
    
    if (phase.name === "warmup") {
      if (currentExerciseIndex >= WorkoutPlan.warmup.exercises.length - 1) {
        moveToNextPhase();
      } else {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
      }
    } else if (phase.name === "mainWorkout") {
      const round = WorkoutPlan.mainWorkout.rounds[currentRoundIndex];
      
      if (isResting) {
        // End of rest period
        setIsResting(false);
        if (currentExerciseIndex >= round.exercises.length) {
          // End of round rest
          if (currentRoundIndex >= WorkoutPlan.mainWorkout.rounds.length - 1) {
            moveToNextPhase();
          } else {
            setCurrentRoundIndex(currentRoundIndex + 1);
            setCurrentExerciseIndex(0);
          }
        }
      } else {
        // End of work period, start rest
        setIsResting(true);
        
        if (currentExerciseIndex === round.exercises.length - 1 && 
            currentRoundIndex < WorkoutPlan.mainWorkout.rounds.length - 1) {
          // Last exercise in the round but not the last round
          setCurrentExerciseIndex(round.exercises.length); // Special case for between-rounds rest
        } else if (currentExerciseIndex === round.exercises.length - 1 && 
                   currentRoundIndex === WorkoutPlan.mainWorkout.rounds.length - 1) {
          // Last exercise in the last round
          setIsResting(false);
          setCurrentExerciseIndex(0);
          setCurrentRoundIndex(0);
          moveToNextPhase();
        } else {
          // Move to next exercise after rest
          setCurrentExerciseIndex(currentExerciseIndex + 1);
        }
      }
    } else if (phase.name === "cooldown") {
      if (currentExerciseIndex >= WorkoutPlan.cooldown.exercises.length - 1) {
        // Workout complete
        completeWorkout();
      } else {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
      }
    }
    
    setCurrentExerciseElapsedTime(0);
  };
  
  const moveToNextPhase = () => {
    if (currentPhaseIndex >= phases.length - 1) {
      completeWorkout();
    } else {
      setCurrentPhaseIndex(currentPhaseIndex + 1);
      setCurrentExerciseIndex(0);
      setCurrentRoundIndex(0);
      setIsResting(false);
      setCurrentExerciseElapsedTime(0);
    }
  };
  
  const startWorkout = () => {
    setScreen('workout');
    startCountdown();
  };
  
  const startCountdown = () => {
    setShowCountdown(true);
    setCountdownNumber(3);
    
    let count = 3;
    const countdownInterval = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdownNumber(count);
      } else if (count === 0) {
        setCountdownNumber('GO!');
      } else {
        clearInterval(countdownInterval);
        setShowCountdown(false);
        
        // Start the timer
        timerRef.current = setInterval(updateTimer, 1000);
      }
    }, 1000);
  };
  
  const updateTimer = () => {
    setCurrentTime(prevTime => {
      if (prevTime <= 0) {
        completeWorkout();
        return 0;
      }
      return prevTime - 1;
    });
    
    setCurrentExerciseElapsedTime(prev => {
      const newTime = prev + 1;
      if (newTime >= currentExerciseTotalTime) {
        moveToNextExercise();
        return 0;
      }
      return newTime;
    });
  };
  
  const pauseWorkout = () => {
    clearInterval(timerRef.current);
    setIsPaused(true);
  };
  
  const resumeWorkout = () => {
    timerRef.current = setInterval(updateTimer, 1000);
    setIsPaused(false);
  };
  
  const resetWorkout = () => {
    clearInterval(timerRef.current);
    setCurrentTime(1800);
    setCurrentPhaseIndex(0);
    setCurrentExerciseIndex(0);
    setCurrentRoundIndex(0);
    setIsPaused(false);
    setIsResting(false);
    setCurrentExerciseElapsedTime(0);
    setScreen('initial');
  };
  
  const completeWorkout = () => {
    clearInterval(timerRef.current);
    setScreen('completion');
  };
  
  // Effects
  useEffect(() => {
    updateExerciseInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPhaseIndex, currentExerciseIndex, currentRoundIndex, isResting]);
  
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  // Current exercise and phase information
  const phase = phases[currentPhaseIndex];
  let exerciseName = '';
  let exerciseIcon = '';
  let exerciseInstruction = '';
  
  if (phase.name === "warmup") {
    const exercise = WorkoutPlan.warmup.exercises[currentExerciseIndex];
    exerciseName = exercise.name;
    exerciseIcon = exercise.icon;
    exerciseInstruction = `Duration: ${exercise.duration}s`;
  } else if (phase.name === "mainWorkout") {
    const round = WorkoutPlan.mainWorkout.rounds[currentRoundIndex];
    
    if (isResting && currentExerciseIndex === round.exercises.length) {
      exerciseName = `Rest before Round ${currentRoundIndex + 2}`;
      exerciseIcon = 'coffee';
      exerciseInstruction = `Rest: ${WorkoutPlan.mainWorkout.restBetweenRounds}s`;
    } else if (isResting) {
      const exercise = round.exercises[currentExerciseIndex];
      exerciseName = 'Rest';
      exerciseIcon = 'coffee';
      exerciseInstruction = `Rest: ${exercise.restDuration}s`;
    } else {
      const exercise = round.exercises[currentExerciseIndex];
      exerciseName = exercise.name;
      exerciseIcon = exercise.icon;
      exerciseInstruction = `Work: ${exercise.workDuration}s`;
    }
  } else if (phase.name === "cooldown") {
    const exercise = WorkoutPlan.cooldown.exercises[currentExerciseIndex];
    exerciseName = exercise.name;
    exerciseIcon = exercise.icon;
    exerciseInstruction = `Duration: ${exercise.duration}s`;
  }
  
  // Progress calculation
  const phaseElapsedTime = currentTime + phaseTotalTimeRef.current - (phaseStartTimeRef.current + phaseTotalTimeRef.current);
  const progressPercentage = Math.min(100, Math.max(0, (phaseElapsedTime / phaseTotalTimeRef.current) * 100));
  
  return (
    <div className="flex justify-center items-center min-h-screen p-5">
      <div className="app-container relative">
        {/* Initial Screen */}
        {screen === 'initial' && (
          <div className="text-center py-12">
            <h1 className="text-3xl text-vivid-pink mb-8">
              <FontAwesomeIcon icon="dumbbell" className="mr-2" /> Ramadan Pro Workout
            </h1>
            <button 
              className="btn"
              onClick={startWorkout}
            >
              Start Workout
            </button>
          </div>
        )}
        
        {/* Workout Screen */}
        {screen === 'workout' && (
          <>
            <div className="phase-indicator">
              <span>{phase.label}</span>
              <FontAwesomeIcon icon={WorkoutPlan[phase.name].icon} className="text-vivid-pink" />
            </div>
            
            <div className="text-center my-5">
              <div className="text-5xl font-bold text-vivid-pink mb-3">
                {formatTime(currentTime)}
              </div>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="text-center my-8">
              <h2 className="text-2xl text-vivid-pink mb-4">{exerciseName}</h2>
              <FontAwesomeIcon icon={exerciseIcon} className="exercise-icon" />
              <p className="exercise-instruction">{exerciseInstruction}</p>
            </div>
            
            <div className="flex justify-center gap-3 mt-8">
              {!isPaused ? (
                <button className="btn" onClick={pauseWorkout}>
                  <FontAwesomeIcon icon="pause" className="mr-2" /> Pause
                </button>
              ) : (
                <button className="btn" onClick={resumeWorkout}>
                  <FontAwesomeIcon icon="play" className="mr-2" /> Resume
                </button>
              )}
              <button className="btn" onClick={resetWorkout}>
                <FontAwesomeIcon icon="redo" className="mr-2" /> Reset
              </button>
            </div>
          </>
        )}
        
        {/* Completion Screen */}
        {screen === 'completion' && (
          <div className="text-center py-12">
            <h1 className="text-3xl text-vivid-pink mb-8 animate-celebrate">
              Workout complete! 🎉
            </h1>
            <button 
              className="btn"
              onClick={resetWorkout}
            >
              Start Again
            </button>
          </div>
        )}
        
        {/* Countdown Overlay */}
        {showCountdown && (
          <div className="countdown-overlay">
            <div className="countdown-number">{countdownNumber}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RamadanWorkoutApp;
