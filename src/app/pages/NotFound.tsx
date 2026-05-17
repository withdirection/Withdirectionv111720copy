import { Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

export function NotFound() {
  return (
    <div className="pt-20 min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
        <h1 className="text-9xl font-bold text-[#00A9E0] mb-4">404</h1>
        <h2 className="text-4xl text-[#14213D] mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It may have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#00A9E0] text-white px-8 py-4 rounded-md hover:bg-[#303F9F] transition-colors"
          >
            <Home size={20} />
            Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 bg-[#F5F7FA] text-[#14213D] px-8 py-4 rounded-md hover:bg-[#E6E9EF] transition-colors border border-[#E6E9EF]"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
