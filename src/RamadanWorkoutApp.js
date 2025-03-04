import React, { useState, useEffect, useRef } from 'react';
import { WorkoutPlan } from './WorkoutPlan';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';

const RamadanWorkoutApp = () => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('initial');
  const [currentRound, setCurrentRound] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(1800);
  const [exerciseTimeRemaining, setExerciseTimeRemaining] = useState(40);
  const [workoutComplete, setWorkoutComplete] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);

  const timerRef = useRef(null);

  const startWorkout = () => {
    setIsActive(true);
    setCurrentPhase('warmup');
    setTimeRemaining(1800);
    setCurrentExercise(WorkoutPlan.warmup[0]);

    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timerRef.current);
          setWorkoutComplete(true);
          return 0;
        }
        return prev - 1;
      });

      setExerciseTimeRemaining(prev => {
        if (prev <= 0) {
          // Move to next exercise logic would go here
          return 40;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseWorkout = () => {
    setIsPaused(true);
    clearInterval(timerRef.current);
  };

  const resumeWorkout = () => {
    setIsPaused(false);
    startWorkout();
  };

  const resetWorkout = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
    setIsPaused(false);
    setCurrentPhase('initial');
    setTimeRemaining(1800);
    setWorkoutComplete(false);
    setCurrentExerciseIndex(0);
    setCurrentRound(0);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ 
        backgroundColor: '#FFF3C7', 
        fontFamily: 'Segoe UI, sans-serif' 
      }}
    >
      {workoutComplete ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#F7418F] mb-4">
            Workout Complete! 🎉
          </h1>
          <button 
            onClick={resetWorkout}
            className="bg-[#FC819E] text-white px-6 py-2 rounded-full hover:bg-[#F7418F] transition"
          >
            <RotateCcw className="inline mr-2" /> Reset Workout
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md">
          {!isActive ? (
            <div className="text-center">
              <h1 className="text-3xl font-bold text-[#F7418F] mb-6">
                <i className="fas fa-dumbbell mr-3"></i>
                Ramadan Pro Workout
              </h1>
              <button 
                onClick={startWorkout}
                className="bg-[#FC819E] text-white px-8 py-3 rounded-full text-xl hover:bg-[#F7418F] transition"
              >
                <Play className="inline mr-2" /> Start Workout
              </button>
            </div>
          ) : (
            <div>
              <div className="absolute top-4 right-4 flex items-center bg-[#FEC7B4] rounded-full px-4 py-2">
                <Clock className="mr-2 text-[#F7418F]" size={20} />
                <span className="ml-1 text-[#F7418F] font-semibold">
                  {currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)}
                </span>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-[#F7418F] mb-4">
                  {Math.floor(timeRemaining / 60)}:
                  {(timeRemaining % 60).toString().padStart(2, '0')}
                </div>
                
                {currentExercise && (
                  <div className="flex items-center justify-center mb-4">
                    <i className={`${currentExercise.icon} mr-3 text-[#F7418F] text-2xl`}></i>
                    <span className="text-xl">{currentExercise.name}</span>
                  </div>
                )}
                
                <div className="w-full bg-[#FEC7B4] rounded-full h-2 mb-4">
                  {/* Progress bar placeholder */}
                </div>

                <div className="flex justify-center space-x-4">
                  {!isPaused ? (
                    <button 
                      onClick={pauseWorkout}
                      className="bg-[#FC819E] text-white px-6 py-2 rounded-full hover:bg-[#F7418F] transition"
                    >
                      <Pause className="inline mr-2" /> Pause
                    </button>
                  ) : (
                    <button 
                      onClick={resumeWorkout}
                      className="bg-[#FC819E] text-white px-6 py-2 rounded-full hover:bg-[#F7418F] transition"
                    >
                      <Play className="inline mr-2" /> Resume
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RamadanWorkoutApp;
