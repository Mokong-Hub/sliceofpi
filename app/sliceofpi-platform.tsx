import React, { useState } from 'react';
import styles from '../components/SliceOfPiApp.module.css';
import { Play, Pause, Heart, MessageCircle, Share, Plus, User, Zap, Coins, TrendingUp, Target, Camera } from 'lucide-react';

const SliceOfPiPlatform = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [sliceProgress] = useState(0.73);
  const [piBalance] = useState(156.8);
  const [dailyStreak] = useState(23);

  const videos = [
    {
      id: 1,
      username: '@cryptoexplorer',
      description: 'Mining PI while exploring the city! 🚀 #PIMining #SliceOfPi',
      likes: 2430,
      comments: 186,
      shares: 94,
      piEarned: 0.8
    },
    {
      id: 2,
      username: '@techqueen',
      description: 'Completed my daily slice challenge! Who else is mining? 💎',
      likes: 1892,
      comments: 203,
      shares: 127,
      piEarned: 1.2
    },
    {
      id: 3,
      username: '@pimaster',
      description: 'Tutorial: How to maximize your slice completion 🥧',
      likes: 3421,
      comments: 445,
      shares: 289,
      piEarned: 2.1
    }
  ];

  const challenges = [
    { id: 1, title: 'Walk 5000 steps', progress: 0.8, reward: '0.5 PI', type: 'fitness' },
    { id: 2, title: 'Post daily content', progress: 1, reward: '0.3 PI', type: 'social' },
    { id: 3, title: 'Invite 3 friends', progress: 0.33, reward: '1.2 PI', type: 'referral' },
    { id: 4, title: '10-day streak', progress: 0.7, reward: '2.0 PI', type: 'consistency' }
  ];

  const activities = [
    { time: '2h ago', action: 'Earned 0.8 PI from video views', amount: '+0.8 PI' },
    { time: '4h ago', action: 'Completed daily challenge', amount: '+0.5 PI' },
    { time: '6h ago', action: 'Friend joined via your link', amount: '+1.2 PI' },
    { time: '8h ago', action: 'Weekly streak bonus', amount: '+0.3 PI' }
  ];

  const getSliceSegments = () => {
    const segments = 8;
    const completedSegments = Math.floor(sliceProgress * segments);
    return Array.from({ length: segments }, (_, i) => i < completedSegments);
  };

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const SliceVisualization = () => {
    const segments = getSliceSegments();
    const radius = 80;
    const centerX = 100;
    const centerY = 100;
    return (
      <div className="relative">
        <svg width="200" height="200" className="transform -rotate-90">
          <circle cx={centerX} cy={centerY} r="30" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4,4" opacity="0.3" />
          <text x={centerX} y={centerY} textAnchor="middle" dy="0.3em" fontSize="24" fill="#9ca3af" opacity="0.4" className="font-bold">π</text>
          <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="#e2e8f0" strokeWidth="8" />
          {segments.map((completed, index) => {
            const angle = (360 / 8) * index;
            const startAngle = angle - 22.5;
            const endAngle = angle + 22.5;
            const start = polarToCartesian(centerX, centerY, radius, startAngle);
            const end = polarToCartesian(centerX, centerY, radius, endAngle);
            const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
            const d = [
              "M", centerX, centerY,
              "L", start.x, start.y,
              "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y,
              "Z"
            ].join(" ");
            return (
              <path
                key={index}
                d={d}
                fill={completed ? '#8b5cf6' : '#e2e8f0'}
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{Math.round(sliceProgress * 100)}%</div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
        </div>
      </div>
    );
  };

  type Video = {
    id: number;
    username: string;
    description: string;
    likes: number;
    comments: number;
    shares: number;
    piEarned: number;
  };

  const VideoPlayer = ({ video }: { video: Video }) => (
    <div className="relative h-full w-full rounded-2xl overflow-hidden">
      <div className={`h-full w-full flex items-center justify-center text-white ${styles[`videoBg${video.id}`]}`}>
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="z-10 bg-black bg-opacity-50 rounded-full p-4 hover:bg-opacity-70 transition-all"
          title={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause size={32} /> : <Play size={32} />}
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
            <User size={20} />
          </div>
          <div>
            <div className="font-semibold">{video.username}</div>
            <div className="text-sm text-purple-300">+{video.piEarned} PI earned</div>
          </div>
        </div>
        <p className="text-sm mb-3">{video.description}</p>
      </div>
      <div className="absolute right-4 bottom-24 flex flex-col gap-3 z-10">
        <button className="bg-black bg-opacity-50 rounded-full p-3 text-white" title="Like">
          <Heart size={24} />
          <div className="text-xs mt-1">{video.likes}</div>
        </button>
        <button className="bg-black bg-opacity-50 rounded-full p-3 text-white" title="Comment">
          <MessageCircle size={24} />
          <div className="text-xs mt-1">{video.comments}</div>
        </button>
        <button className="bg-black bg-opacity-50 rounded-full p-3 text-white" title="Share">
          <Share size={24} />
          <div className="text-xs mt-1">{video.shares}</div>
        </button>
        <button className="bg-purple-500 rounded-full p-3 text-white" title="Earn Coins">
          <Coins size={24} />
        </button>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Track your PI slice progress</p>
        </div>
        <button className="bg-purple-500 text-white rounded-xl px-4 py-2 flex items-center gap-2" title="Create new content">
          <Plus size={20} />
          Create
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-200 text-sm">Total PI Balance</p>
              <p className="text-2xl font-bold">{piBalance.toFixed(1)}</p>
            </div>
            <Coins size={32} />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm">Daily Streak</p>
              <p className="text-2xl font-bold">{dailyStreak}</p>
            </div>
            <Zap size={32} />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4">Today's Slice Progress</h2>
        <div className="flex items-center justify-center">
          <SliceVisualization />
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-600 mb-2">Complete your slice to earn bonus PI!</p>
          <div className="bg-purple-100 rounded-xl px-4 py-2 inline-block">
            <span className="text-purple-600 font-semibold">Potential Bonus: +2.5 PI</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4">Daily Challenges</h2>
        <div className="space-y-4">
          {challenges.map(challenge => (
            <div key={challenge.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div
                    className={`bg-purple-500 h-2 rounded-full transition-all duration-300 ${styles[`progressBarWidth${Math.round(challenge.progress * 100)}`]}`}
                  />
                </div>
              </div>
              <div className="ml-4 text-right">
                <div className="text-sm font-semibold text-purple-600">{challenge.reward}</div>
                <div className="text-xs text-gray-500">{Math.round(challenge.progress * 100)}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl">
              <div>
                <p className="text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
              <div className="text-green-600 font-semibold">{activity.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const HomeTab = () => (
    <div className="h-full relative">
      <VideoPlayer video={videos[currentVideo]} />
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentVideo(index)}
            className={`w-2 h-8 rounded-full ${index === currentVideo ? 'bg-white' : 'bg-white bg-opacity-50'}`}
            title={`Go to video ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-gray-100 h-screen overflow-hidden">
      <div className="h-full pb-20">
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'challenges' && (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Adventure Challenges</h1>
            <div className="space-y-4">
              {challenges.map(challenge => (
                <div key={challenge.id} className="bg-white rounded-2xl p-4 shadow-sm">
                  <h3 className="font-bold text-lg">{challenge.title}</h3>
                  <p className="text-gray-600 mt-1">Reward: {challenge.reward}</p>
                  <div className="mt-3 bg-gray-200 rounded-full h-3">
                    <div
                      className={`bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full ${styles[`progressBarWidth${Math.round(challenge.progress * 100)}`]}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'create' && (
          <div className="p-6 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <Camera size={48} className="mx-auto text-purple-500 mb-4" />
              <button className="bg-purple-500 text-white rounded-xl px-6 py-3 font-semibold" title="Start recording content">
                Start Recording
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          {[
            { key: 'home', icon: Play, label: 'Home' },
            { key: 'dashboard', icon: TrendingUp, label: 'Dashboard' },
            { key: 'challenges', icon: Target, label: 'Challenges' },
            { key: 'create', icon: Plus, label: 'Create' }
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg ${activeTab === key ? 'text-purple-600 bg-purple-50' : 'text-gray-600'}`}
              title={label}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliceOfPiPlatform;