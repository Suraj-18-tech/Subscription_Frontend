import { useEffect, useState } from 'react';
import {
  Plus,
  Trash2,
  LogOut,
  Zap,
  Package,
  Users,
  DollarSign,
  Edit2,
  X,
  Check,
} from 'lucide-react';

// Types
interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_days: number;
  features: string[];
  is_active: boolean;
}

interface Subscription {
  id: string;
  plan_id: string;
  status: string;
  plan?: {
    price: number;
  };
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
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    is_active: true
  },
  {
    id: '2',
    name: 'Pro Plan',
    description: 'For power users and businesses',
    price: 29.99,
    duration_days: 30,
    features: ['All Basic features', 'Advanced Feature 1', 'Advanced Feature 2', 'Priority Support'],
    is_active: true
  },
  {
    id: '3',
    name: 'Enterprise',
    description: 'Custom solutions for large teams',
    price: 99.99,
    duration_days: 30,
    features: ['All Pro features', 'Custom Integration', 'Dedicated Support', 'SLA Guarantee'],
    is_active: true
  }
];

const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    plan_id: '1',
    status: 'active',
    plan: { price: 9.99 }
  },
  {
    id: '2',
    plan_id: '2',
    status: 'active',
    plan: { price: 29.99 }
  },
  {
    id: '3',
    plan_id: '2',
    status: 'active',
    plan: { price: 29.99 }
  }
];

const mockUsers = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
  { id: '5' }
];

// Mock auth context
const useAuth = () => {
  return {
    profile: {
      id: 'admin1',
      full_name: 'Admin User',
      email: 'admin@example.com'
    } as UserProfile,
    signOut: () => {
      console.log('Signing out...');
      // Implement your sign out logic here
    }
  };
};

export default function AdminDashboard() {
  const { profile, signOut } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalUsers: 0, activeSubs: 0, revenue: 0 });
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration_days: '30',
    features: [''],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Simulate API calls with setTimeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setPlans(mockPlans);

      const revenue = mockSubscriptions.reduce((sum, sub) => {
        return sum + (Number(sub.plan?.price) || 0);
      }, 0);

      setStats({
        totalUsers: mockUsers.length,
        activeSubs: mockSubscriptions.length,
        revenue,
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const planData = {
        id: editingPlan?.id || String(Date.now()),
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        duration_days: parseInt(formData.duration_days),
        features: formData.features.filter(f => f.trim()),
        is_active: true,
      };

      if (editingPlan) {
        // Update existing plan
        setPlans(plans.map(p => p.id === editingPlan.id ? planData : p));
      } else {
        // Add new plan
        setPlans([...plans, planData]);
      }

      setShowModal(false);
      setEditingPlan(null);
      setFormData({ name: '', description: '', price: '', duration_days: '30', features: [''] });
      
      // Update stats
      const activeSubs = mockSubscriptions.length;
      const revenue = mockSubscriptions.reduce((sum, sub) => sum + (Number(sub.plan?.price) || 0), 0);
      setStats(prev => ({ ...prev, activeSubs, revenue }));
    } catch (error) {
      console.error('Error saving plan:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this plan?')) return;

    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      setPlans(plans.filter(plan => plan.id !== id));
      
      // Update stats if any subscriptions were using this plan
      const updatedSubs = mockSubscriptions.filter(sub => sub.plan_id !== id);
      const revenue = updatedSubs.reduce((sum, sub) => sum + (Number(sub.plan?.price) || 0), 0);
      setStats(prev => ({ ...prev, activeSubs: updatedSubs.length, revenue }));
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  const openEditModal = (plan: Plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      description: plan.description || '',
      price: plan.price.toString(),
      duration_days: plan.duration_days.toString(),
      features: plan.features,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPlan(null);
    setFormData({ name: '', description: '', price: '', duration_days: '30', features: [''] });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const togglePlanStatus = async (id: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      setPlans(plans.map(plan => 
        plan.id === id ? { ...plan, is_active: !plan.is_active } : plan
      ));
    } catch (error) {
      console.error('Error toggling plan status:', error);
    }
  };

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
                <p className="text-xs text-gray-400">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {profile?.full_name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-white font-medium">{profile?.full_name}</span>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                  Admin
                </span>
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

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
          <p className="text-gray-400">Manage plans and monitor your business</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl rounded-2xl border border-blue-400/30 p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Total</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stats.totalUsers}</p>
            <p className="text-gray-400 text-sm">Registered Users</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-xl rounded-2xl border border-green-400/30 p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-8 h-8 text-green-400" />
              <span className="text-green-400 text-sm font-medium">Active</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stats.activeSubs}</p>
            <p className="text-gray-400 text-sm">Subscriptions</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-xl rounded-2xl border border-purple-400/30 p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">MRR</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">${stats.revenue.toFixed(2)}</p>
            <p className="text-gray-400 text-sm">Monthly Revenue</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <Package className="w-6 h-6 text-cyan-400" />
            Subscription Plans
          </h3>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Add New Plan
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="group bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">{plan.name}</h4>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>
                <button
                  onClick={() => togglePlanStatus(plan.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                    plan.is_active 
                      ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                      : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                  }`}
                >
                  {plan.is_active ? 'Active' : 'Inactive'}
                </button>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400">/ {plan.duration_days} days</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {plan.features.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
                {plan.features.length > 3 && (
                  <p className="text-gray-500 text-xs">+{plan.features.length - 3} more features</p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(plan)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-800 border-b border-white/10 p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">
                {editingPlan ? 'Edit Plan' : 'Create New Plan'}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Plan Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Premium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                  placeholder="Brief description of the plan"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="9.99"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Duration (days)
                  </label>
                  <input
                    type="number"
                    value={formData.duration_days}
                    onChange={(e) => setFormData({ ...formData, duration_days: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="30"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Features
                </label>
                <div className="space-y-3">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Feature description"
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="p-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addFeature}
                  className="mt-3 flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-400 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Feature
                </button>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 bg-white/5 text-gray-400 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all"
                >
                  {editingPlan ? 'Update Plan' : 'Create Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}