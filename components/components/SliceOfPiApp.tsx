import React from 'react';

export default function SliceOfPiApp() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white">
      <h1 className="text-5xl font-bold mb-4">🍕 SliceOfPi</h1>
      <p className="text-xl mb-8">Welcome to the Pi-powered video challenge platform!</p>
      <div className="bg-white/20 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">How it works</h2>
        <ul className="list-disc pl-6 text-lg space-y-2">
          <li>🎬 Upload short videos</li>
          <li>🏆 Join daily challenges</li>
          <li>🔥 Earn and spend Pi</li>
          <li>💡 Track streaks & get rewarded</li>
        </ul>
      </div>
    </div>
  );
}