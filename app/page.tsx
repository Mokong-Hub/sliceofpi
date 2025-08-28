import SliceOfPiApp from '../components/SliceOfPiApp';

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8 sm:py-20">
      {/* Main Slice of Pi App */}
      <SliceOfPiApp />
    </div>
  );
}