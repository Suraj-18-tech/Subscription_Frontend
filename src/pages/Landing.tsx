import { ArrowRight, CheckCircle2, Zap, Shield, Users } from 'lucide-react';

interface LandingProps {
  onGetStarted: () => void;
}

export default function Landing({ onGetStarted }: LandingProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-blue-900/95"></div>
      </div>

      <div className="relative z-10">
        <nav className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">SubsFlow</span>
            </div>
            <button
              onClick={onGetStarted}
              className="px-6 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              Sign In
            </button>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30">
              <span className="text-blue-300 text-sm font-medium">Manage Subscriptions Effortlessly</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Subscription
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Management
              </span>
              <br />
              Made Simple
            </h1>

            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Streamline your subscription business with powerful tools for managing plans,
              tracking users, and growing your revenue.
            </p>

            <button
              onClick={onGetStarted}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-lg font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-32 max-w-6xl mx-auto">
            <div className="group bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-blue-400/50">
              <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
                <Zap className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
              <p className="text-gray-400 leading-relaxed">
                Quick setup and instant deployment. Get your subscription platform running in minutes.
              </p>
            </div>

            <div className="group bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-cyan-400/50">
              <div className="w-14 h-14 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-500/30 transition-colors">
                <Shield className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Secure & Reliable</h3>
              <p className="text-gray-400 leading-relaxed">
                Enterprise-grade security with encrypted data and reliable infrastructure.
              </p>
            </div>

            <div className="group bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-green-400/50">
              <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500/30 transition-colors">
                <Users className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">User Friendly</h3>
              <p className="text-gray-400 leading-relaxed">
                Intuitive interface designed for both administrators and end users.
              </p>
            </div>
          </div>

          <div className="mt-32 max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Everything You Need</h2>
              <p className="text-gray-400 text-lg">Powerful features to grow your business</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Flexible subscription plans',
                'Real-time notifications',
                'Advanced analytics dashboard',
                'Automated billing',
                'Multi-tier access control',
                'Seamless plan upgrades',
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-200"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="container mx-auto px-6 py-8 mt-20">
          <div className="border-t border-white/10 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SubsFlow. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
