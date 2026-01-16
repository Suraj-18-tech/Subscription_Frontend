import { useEffect, useState } from 'react';
import {
  Bell,
  Check,
  Calendar,
  CreditCard,
  LogOut,
  Zap,
  Package,
  BellDot,
  X
} from 'lucide-react';

// Types
interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_days: number;
  is_active: boolean;
  features: string[];
}

interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: 'active' | 'expired' | 'cancelled';
  start_date: string;
  end_date: string;
  plan?: Plan;
}

interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  is_read: boolean;
  created_at: string;
}

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
}

// Mock data
const mockPlans: Plan[] = [
  {
    id: '1',
    name: 'Basic Plan',
    description: 'Perfect for getting started',
    price: 9.99,
    duration_days: 30,
    is_active: true,
    features: ['Feature 1', 'Feature 2', 'Feature 3']
  },
  {
    id: '2',
    name: 'Pro Plan',
    description: 'For power users and businesses',
    price: 29.99,
    duration_days: 30,
    is_active: true,
    features: ['All Basic features', 'Advanced Feature 1', 'Advanced Feature 2', 'Priority Support']
  },
  {
    id: '3',
    name: 'Enterprise',
    description: 'Custom solutions for large teams',
    price: 99.99,
    duration_days: 30,
    is_active: true,
    features: ['All Pro features', 'Custom Integration', 'Dedicated Support', 'SLA Guarantee']
  }
];

const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    user_id: 'user123',
    plan_id: '1',
    status: 'active',
    start_date: '2024-01-01',
    end_date: '2024-02-01',
    plan: mockPlans[0]
  }
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    user_id: 'user123',
    title: 'Welcome!',
    message: 'Welcome to SubsFlow! Start exploring our plans.',
    type: 'success',
    is_read: false,
    created_at: '2024-01-01T10:00:00Z'
  },
  {
    id: '2',
    user_id: 'user123',
    title: 'Subscription Renewal',
    message: 'Your subscription will renew in 7 days.',
    type: 'info',
    is_read: true,
    created_at: '2024-01-15T14:30:00Z'
  }
];

// Mock auth context
const useAuth = () => {
  return {
    profile: {
      id: 'user123',
      full_name: 'John Doe',
      email: 'john@example.com'
    } as UserProfile,
    signOut: () => {
      console.log('Signing out...');
      // Implement your sign out logic here
    }
  };
};

export default function UserDashboard() {
  const { profile, signOut } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [profile]);

  const loadData = async () => {
    if (!profile) return;

    try {
      // Simulate API calls with setTimeout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPlans(mockPlans);
      setSubscriptions(mockSubscriptions);
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 100));
      
      setNotifications(notifications.map(n =>
        n.id === id ? { ...n, is_read: true } : n
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-500/20 border-green-500/50 text-green-300';
      case 'warning': return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300';
      case 'error': return 'bg-red-500/20 border-red-500/50 text-red-300';
      default: return 'bg-blue-500/20 border-blue-500/50 text-blue-300';
    }
  };

  const subscribeToPlan = async (planId: string) => {
    try {
      console.log('Subscribing to plan:', planId);
      // Implement your subscription logic here
      alert(`Subscribed to plan ${planId}!`);
    } catch (error) {
      console.error('Error subscribing to plan:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900">
      <nav className="bg-slate-800/50 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-blue-400" />
              <div>
                <h1 className="text-xl font-bold text-white">SubsFlow</h1>
                <p className="text-xs text-gray-400">User Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
              >
                {unreadCount > 0 ? <BellDot className="w-6 h-6 text-blue-400" /> : <Bell className="w-6 h-6 text-gray-400" />}
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {profile?.full_name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-white font-medium">{profile?.full_name}</span>
              </div>
              <button
                onClick={signOut}
                className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-all group"
              >
                <LogOut className="w-6 h-6 text-red-400 group-hover:text-red-300" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {showNotifications && (
        <div className="fixed top-20 right-6 w-96 max-h-[600px] bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl z-50 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-white font-semibold">Notifications</h3>
            <button
              onClick={() => setShowNotifications(false)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div className="overflow-y-auto max-h-[500px]">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                No notifications yet
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${
                    !notif.is_read ? 'bg-blue-500/5' : ''
                  }`}
                  onClick={() => !notif.is_read && markAsRead(notif.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${getNotificationColor(notif.type)}`}>
                      <Bell className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-1">{notif.title}</h4>
                      <p className="text-gray-400 text-sm">{notif.message}</p>
                      <p className="text-gray-500 text-xs mt-2">
                        {new Date(notif.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back, {profile?.full_name}!</h2>
          <p className="text-gray-400">Manage your subscriptions and explore new plans</p>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-400" />
            Your Subscriptions
          </h3>
          {subscriptions.length === 0 ? (
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/10 p-12 text-center">
              <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">You don't have any active subscriptions yet</p>
              <p className="text-gray-500 text-sm mt-2">Explore our plans below to get started</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className="group bg-gradient-to-br from-slate-800/80 to-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-blue-400/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-bold text-white">{sub.plan?.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      sub.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      sub.status === 'expired' ? 'bg-red-500/20 text-red-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {sub.status}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">{sub.plan?.description}</p>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>Ends: {new Date(sub.end_date).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-2xl font-bold text-white">${sub.plan?.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Package className="w-6 h-6 text-cyan-400" />
            Available Plans
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="group bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/10 p-8 hover:bg-slate-800/70 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                <div className="mb-6">
                  <h4 className="text-2xl font-bold text-white mb-2">{plan.name}</h4>
                  <p className="text-gray-400">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-400">/ {plan.duration_days} days</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => subscribeToPlan(plan.id)}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg group-hover:shadow-cyan-500/50"
                >
                  Subscribe Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}