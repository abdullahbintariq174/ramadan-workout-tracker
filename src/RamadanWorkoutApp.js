import React, { useState, useEffect, useRef } from 'react';
import WorkoutPlan from './WorkoutPlan';

const RamadanWorkoutApp = () => {
  // States
  const [time, setTime] = useState(1800); // 30 minutes in seconds
  const [running, setRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('warmup');
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [currentExercise, setCurrentExercise] = useState("Press Start to Begin");
  const [isResting, setIsResting] = useState(false);
  const [roundIndex, setRoundIndex] = useState(0);
  
  // Refs
  const timerRef = useRef(null);
  const totalTime = 1800; // 30 minutes
  
  // Helper function to format time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Start timer
  const startTimer = () => {
    if (!running) {
      setRunning(true);
      timerRef.current = setInterval(updateTimer, 1000);
    }
  };
  
  // Pause timer
  const pauseTimer = () => {
    if (running) {
      clearInterval(timerRef.current);
      setRunning(false);
    }
  };
  
  // Reset timer
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTime(totalTime);
    setRunning(false);
    setCurrentPhase('warmup');
    setExerciseIndex(0);
    setRoundIndex(0);
    setIsResting(false);
    setCurrentExercise("Press Start to Begin");
  };
  
  // Update timer and workout progress
  const updateTimer = () => {
    setTime(prevTime => {
      if (prevTime <= 0) {
        clearInterval(timerRef.current);
        setRunning(false);
        setCurrentExercise("Workout Complete! 🎉");
        return 0;
      }
      
      // Calculate time spent in the workout so far
      const elapsed = totalTime - prevTime + 1; // +1 because we're about to decrement
      updateExerciseStatus(elapsed);
      
      return prevTime - 1;
    });
  };
  
  // Determine current exercise based on elapsed time
  const updateExerciseStatus = (elapsed) => {
    // Warmup phase (0-300 seconds)
    if (elapsed <= 300) {
      setCurrentPhase('warmup');
      const warmupIndex = Math.floor((elapsed - 1) / 30) % WorkoutPlan.warmup.exercises.length;
      if (warmupIndex !== exerciseIndex || currentPhase !== 'warmup') {
        setExerciseIndex(warmupIndex);
        setCurrentExercise(WorkoutPlan.warmup.exercises[warmupIndex].name);
      }
    }
    // Main workout phase (300-1500 seconds)
    else if (elapsed <= 1500) {
      setCurrentPhase('mainWorkout');
      
      // Time within main workout phase
      const mainWorkoutTime = elapsed - 300;
      let timeAccumulated = 0;
      let foundExercise = false;
      
      // Loop through rounds
      for (let r = 0; r < WorkoutPlan.mainWorkout.rounds.length; r++) {
        const round = WorkoutPlan.mainWorkout.rounds[r];
        
        // Round time including exercises and rest
        const roundDuration = round.exercises.reduce((sum, ex) => 
          sum + ex.workDuration + ex.restDuration, 0);
        
        // Add rest between rounds (except after last round)
        const roundTotalTime = r < WorkoutPlan.mainWorkout.rounds.length - 1 
          ? roundDuration + WorkoutPlan.mainWorkout.restBetweenRounds 
          : roundDuration;
          
        if (mainWorkoutTime > timeAccumulated && 
            mainWorkoutTime <= timeAccumulated + roundTotalTime) {
          // We're in this round
          let exerciseTime = mainWorkoutTime - timeAccumulated;
          let exTimeSum = 0;
          
          // Find the specific exercise
          for (let e = 0; e < round.exercises.length; e++) {
            const exercise = round.exercises[e];
            const exerciseTotalTime = exercise.workDuration + exercise.restDuration;
            
            if (exerciseTime > exTimeSum && 
                exerciseTime <= exTimeSum + exerciseTotalTime) {
              // We're in this exercise
              const isInRestPeriod = exerciseTime > exTimeSum + exercise.workDuration;
              
              if (roundIndex !== r || exerciseIndex !== e || isResting !== isInRestPeriod) {
                setRoundIndex(r);
                setExerciseIndex(e);
                setIsResting(isInRestPeriod);
                setCurrentExercise(isInRestPeriod 
                  ? `Rest` 
                  : `${round.exercises[e].name}`);
              }
              
              foundExercise = true;
              break;
            }
            
            exTimeSum += exerciseTotalTime;
          }
          
          // Check if we're in the rest between rounds
          if (!foundExercise && r < WorkoutPlan.mainWorkout.rounds.length - 1) {
            if (roundIndex !== r || !isResting) {
              setRoundIndex(r);
              setExerciseIndex(0);
              setIsResting(true);
              setCurrentExercise(`Rest before Round ${r + 2}`);
            }
          }
          
          break;
        }
        
        timeAccumulated += roundTotalTime;
      }
    }
    // Cooldown phase (1500-1800 seconds)
    else {
      setCurrentPhase('cooldown');
      const cooldownTime = elapsed - 1500;
      let timeSum = 0;
      
      for (let i = 0; i < WorkoutPlan.cooldown.exercises.length; i++) {
        timeSum += WorkoutPlan.cooldown.exercises[i].duration;
        
        if (cooldownTime <= timeSum) {
          if (exerciseIndex !== i || currentPhase !== 'cooldown') {
            setExerciseIndex(i);
            setCurrentExercise(WorkoutPlan.cooldown.exercises[i].name);
            setIsResting(false);
          }
          break;
        }
      }
    }
  };
  
  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  // Get current phase display name
  const getPhaseDisplay = () => {
    switch(currentPhase) {
      case 'warmup': return 'Warm-up';
      case 'mainWorkout': return 'Main Workout';
      case 'cooldown': return 'Cool-down';
      default: return '';
    }
  };
  
  // Calculate progress percentage
  const progressPercentage = ((totalTime - time) / totalTime) * 100;
  
  return (
    <div className="container">
      <h1>
        <i className="fas fa-dumbbell"></i> Ramadan Pro Workout
      </h1>
      
      {running && <div className="phase-indicator">{getPhaseDisplay()}</div>}
      
      <div className="timer">{formatTime(time)}</div>
      
      <div className="progress-container">
        <div 
          className="progress" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="exercise">
        {isResting ? 
          <span>🕊️ Rest</span> : 
          currentExercise
        }
      </div>
      
      <div className="buttons">
        {!running ? (
          <button onClick={startTimer} disabled={running || time === 0}>
            <i className="fas fa-play icon"></i>Start
          </button>
        ) : (
          <button onClick={pauseTimer} disabled={!running}>
            <i className="fas fa-pause icon"></i>Pause
          </button>
        )}
        <button onClick={resetTimer} disabled={time === totalTime && !running}>
          <i className="fas fa-redo icon"></i>Reset
        </button>
      </div>
    </div>
  );
};

export default RamadanWorkoutApp;
