'use client';

import { useState, useEffect, useRef } from 'react';
import { Timer } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import FAQ from '@/components/ui/FAQ';
import { generateToolSchema, generateFAQSchema } from '@/lib/utils';

const faqs = [
  {
    question: "What is a study timer?",
    answer: "A study timer helps you manage study sessions by tracking time spent on tasks and encouraging focused, uninterrupted work."
  },
  {
    question: "How can a timer improve study habits?",
    answer: "Timers create a sense of urgency and help structure study sessions, reducing procrastination and improving productivity."
  },
  {
    question: "What is the Pomodoro technique?",
    answer: "The Pomodoro technique involves studying for 25 minutes followed by a 5-minute break, repeated several times to boost focus."
  },
  {
    question: "Can I use this for exam preparation?",
    answer: "Yes! Timed study sessions help improve time management and simulate exam conditions."
  }
];

export default function StudyTimerPage() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [time, setTime] = useState(1500); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const totalSeconds = hours * 3600 + minutes * 60;

  useEffect(() => {
    setTime(totalSeconds);
  }, [hours, minutes]);

  const handleStartPause = () => {
    if (time > 0) setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(totalSeconds);
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  const progress = totalSeconds > 0
    ? ((totalSeconds - time) / totalSeconds) * 100
    : 0;

  const toolSchema = generateToolSchema({
    title: 'Study Timer - Boost Your Focus with Timed Study Sessions',
    description: 'Free online study timer. Set your study duration in hours and minutes, start the timer, and stay focused with structured time management.',
    url: '/education/study-timer'
  });

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toolSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Timer className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Study Timer</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay focused and productive with a customizable study timer. Set your hours and minutes, and track your study time with ease.
          </p>
        </div>

        {/* Ad Banner */}
        <AdBanner position="top" className="mb-8" />

        {/* Timer Tool */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Settings */}
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-6">Set Your Study Time</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                  placeholder="Hours"
                  min="0"
                  className="flex-1 px-3 py-2 border border-input rounded-lg bg-background"
                />
                <input
                  type="number"
                  value={minutes}
                  onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                  placeholder="Minutes"
                  min="0"
                  max="59"
                  className="flex-1 px-3 py-2 border border-input rounded-lg bg-background"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleStartPause}
                  className="flex-1 bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90"
                >
                  {isRunning ? 'Pause' : 'Start'}
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 bg-muted/30 py-3 px-6 rounded-lg font-medium"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Timer Display */}
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold text-foreground mb-6">Timer</h2>
            <div className="text-6xl font-bold mb-4">{formatTime(time)}</div>
            <div className="w-full bg-muted/30 h-4 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Ad Banner */}
        <AdBanner position="middle" className="mb-8" />

        {/* Tips */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Study Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-muted/20 p-4 rounded-lg">⏳ Use the Pomodoro technique for efficient study breaks.</div>
            <div className="bg-muted/20 p-4 rounded-lg">📵 Keep distractions away while the timer is running.</div>
            <div className="bg-muted/20 p-4 rounded-lg">💧 Stay hydrated to maintain focus and energy.</div>
            <div className="bg-muted/20 p-4 rounded-lg">📝 Plan tasks before starting your timer.</div>
          </div>
        </div>

        {/* FAQ */}
        <FAQ faqs={faqs} />
      </div>
    </>
  );
}
