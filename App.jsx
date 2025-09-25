import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [task, setTask] = useState('');
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  const [streak, setStreak] = useState(0);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  // Timer countdown
  useEffect(() => {
    let interval;
    if (timerRunning && time > 0) {
      interval = setInterval(() => setTime(t => t - 1), 1000);
    } else if (time === 0 && timerRunning) {
      setTimerRunning(false);
      alert("Time's up! Take a micro-break.");
      setLogs(prev => [...prev, { task: `${selectedSubject}: ${task}`, duration: time }]);
      setStreak(prev => prev + 1);
      setTask('');
    }
    return () => clearInterval(interval);
  }, [timerRunning, time]);

  // Idle nudges
  useEffect(() => {
    const idleInterval = setInterval(() => {
      if (timerRunning && Date.now() - lastInteraction > 30000) {
        alert('Hey! Focus back on your task 😊');
        setLastInteraction(Date.now());
      }
    }, 5000);
    return () => clearInterval(idleInterval);
  }, [timerRunning, lastInteraction]);

  const startTimer = () => {
    if (!selectedSubject) {
      alert('Please select a subject first!');
      return;
    }
    if (task.trim() && time > 0) {
      setTimerRunning(true);
      setLastInteraction(Date.now());
    } else {
      alert('Please enter a task and time in minutes!');
    }
  };

  const resetStreak = () => setStreak(0);
  const handleInteraction = () => setLastInteraction(Date.now());

  // SUBJECTS & CHAPTERS DATA
  const subjects = ['Maths', 'Science'];

  const mathChapters = {
    'Number System': {
      keyPoints: [
        'Natural Numbers: 1, 2, 3, ...',
        'Whole Numbers: 0, 1, 2, ...',
        'Integers: ..., -2, -1, 0, 1, 2, ...',
        'Rational Numbers: Can be expressed as p/q',
        'Irrational Numbers: Cannot be expressed as p/q',
        'Real Numbers: All rational and irrational numbers',
        'Decimal Expansions: Terminating and Non-Terminating',
        'Laws of Exponents: a^m × a^n = a^(m+n)',
        'Laws of Radicals: √a × √b = √(a × b)',
        'Scientific Notation: a × 10^n'
      ],
      questions: [
        'Convert 0.625 to a fraction.',
        'Express 1/3 as a decimal.',
        'Find HCF and LCM of 24 and 36.',
        'Simplify: (2^3 × 2^2) ÷ 2^4.',
        'Express 0.333... as a fraction.',
        'Find the square root of 50.',
        'Convert 5.6 × 10^3 to standard form.',
        'Simplify: √(2 × 3).',
        'Convert 0.75 to a fraction.',
        'Find the cube root of 27.'
      ]
    },
    'Polynomials': {
      keyPoints: [
        'Polynomial: An expression of the form ax^n + bx^(n-1) + ... + z',
        'Degree of Polynomial: Highest power of the variable',
        'Monomial: One term polynomial',
        'Binomial: Two term polynomial',
        'Trinomial: Three term polynomial',
        'Zeroes of Polynomial: Values of x for which f(x) = 0',
        'Remainder Theorem: f(a) = remainder when f(x) is divided by (x-a)',
        'Factor Theorem: (x-a) is a factor of f(x) if f(a) = 0',
        'Algebraic Identities: (a+b)^2 = a^2 + 2ab + b^2',
        'Factorization: Expressing polynomial as a product of factors'
      ],
      questions: [
        'Find the remainder when x^3 - 2x^2 + 3x - 4 is divided by x-2.',
        'Check if x+1 is a factor of x^3 + 2x^2 + x + 2.',
        'Factorize x^2 + 5x + 6.',
        'Factorize 2x^2 - 5x - 3.',
        'Find roots of x^2 - 7x + 10.',
        'If p(x) = x^3 - 3x^2 + 2x, find p(1).',
        'Divide x^3 + 4x^2 + x + 6 by x+2.',
        'Use factor theorem to check if x-3 is a factor of x^3 - 3x^2 + x + 5.',
        'Find zeroes of polynomial x^2 + 3x + 2.',
        'Check remainder of x^3 - 2x^2 + x + 1 divided by x-1.'
      ]
    },
    // Add other maths chapters similarly
  };

  const scienceChapters = {
    'Matter in Our Surroundings': {
      summary: `Matter is anything that has mass and occupies space. It exists in three states: solid, liquid, and gas. The state of matter depends on the arrangement and energy of its particles. Solids have closely packed particles with low energy, liquids have loosely packed particles with moderate energy, and gases have widely spaced particles with high energy. The change of state occurs due to the change in temperature or pressure. For example, heating a solid can convert it into a liquid (melting), and further heating can convert it into a gas (evaporation). Similarly, cooling a gas can convert it into a liquid (condensation), and further cooling can convert it into a solid (freezing). These changes are physical changes and are reversible. Understanding the properties and behavior of matter is fundamental in various scientific fields, including chemistry, physics, and biology.`,
      questions: [
        'What is matter?',
        'Explain the three states of matter.',
        'What is the change of state?',
        'Define physical change.',
        'What is meant by reversible change?',
        'Explain the process of melting.',
        'What is evaporation?',
        'Define condensation.',
        'What is freezing?',
        'Give examples of physical changes.'
      ]
    }
  };

  const handleSubjectClick = subject => {
    setSelectedSubject(subject);
    setSelectedChapter(null);
  };

  const handleChapterClick = chapter => {
    setSelectedChapter(chapter);
  };

  return (
    <div className="app-container" onClick={handleInteraction}>
      <div className="sidebar">
        <h2>Subjects</h2>
        {subjects.map(subject => (
          <button
            key={subject}
            className={`subject-button ${selectedSubject === subject ? 'selected' : ''}`}
            onClick={() => handleSubjectClick(subject)}
          >
            {subject}
          </button>
        ))}
        {selectedSubject &&
          (selectedSubject === 'Maths'
            ? Object.keys(mathChapters).map(chap => (
                <button
                  key={chap}
                  className={`chapter-button ${selectedChapter === chap ? 'selected' : ''}`}
                  onClick={() => handleChapterClick(chap)}
                >
                  {chap}
                </button>
              ))
            : Object.keys(scienceChapters).map(chap => (
                <button
                  key={chap}
                  className={`chapter-button ${selectedChapter === chap ? 'selected' : ''}`}
                  onClick={() => handleChapterClick(chap)}
                >
                  {chap}
                </button>
              )))
        }
      </div>

      <div className="main-content">
        <h1>FocusPal</h1>
        <h3>Your AI Study Buddy</h3>

        {selectedChapter && (
          <div className="content-card">
            <h2>{selectedChapter}</h2>
            <div className="key-points">
              <h3>Key Points</h3>
              <ul>
                {selectedSubject === 'Maths'
                  ? mathChapters[selectedChapter].keyPoints.map((point, i) => <li key={i}>{point}</li>)
                  : <li>{scienceChapters[selectedChapter].summary}</li>}
              </ul>
            </div>

            <div className="questions">
              <h3>Questions</h3>
              <ul>
                {selectedSubject === 'Maths'
                  ? mathChapters[selectedChapter].questions.map((q, i) => <li key={i}>{q}</li>)
                  : scienceChapters[selectedChapter].questions.map((q, i) => <li key={i}>{q}</li>)}
              </ul>
            </div>
          </div>
        )}

        {/* Micro-goal & Timer */}
        <div className="timer-card">
          <h2>Set a Micro-Goal / Pomodoro</h2>
          <input
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={e => setTask(e.target.value)}
          />
          <input
            type="number"
            placeholder="Minutes"
            value={time / 60}
            onChange={e => setTime(Number(e.target.value) * 60)}
          />
          <button onClick={startTimer}>Start Timer</button>
          {timerRunning && <p>⏱ Time Left: {Math.floor(time / 60)}:{time % 60 < 10 ? '0' + (time % 60) : time % 60}</p>}
        </div>

        <div className="progress-card">
          <h2>Progress & Streaks</h2>
          <p>🔥 Current Streak: {streak} session{streak !== 1 ? 's' : ''} <button onClick={resetStreak}>Reset</button></p>
          <div className="logs">
            {logs.length === 0 ? <p>No logs yet. Start a session!</p> : logs.map((log, i) => (
              <div key={i} className="log-entry">
                <span>{log.task}</span>
                <span>{Math.floor(log.duration / 60)} min</span>
              </div>
            ))}
          </div>
        </div>

        {!timerRunning && logs.length > 0 && (
          <div className="micro-break">
            <h3>💡 Micro-Break Suggestion</h3>
            <p>Take a 2-min stretch, walk around, or do deep breathing before your next session!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
