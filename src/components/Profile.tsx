
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

const Profile = () => {
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const handleSave = () => {
    const updatedUser = { ...user!, ...formData };
    setUser(updatedUser);
    localStorage.setItem('enro-user', JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your personal information and preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Picture & Basic Info */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl shadow-lg p-6 text-center border">
            <div className="w-24 h-24 bg-gradient-to-br from-jade-500 to-jade-600 rounded-full flex items-center justify-center text-primary-foreground text-3xl font-bold mx-auto mb-4">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-semibold text-card-foreground">{user?.name}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
            
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mt-3 ${
              user?.subscriptionPlan === 'free' ? 'bg-muted text-muted-foreground' :
              user?.subscriptionPlan === 'pro' ? 'bg-jade-100 text-jade-600' :
              'bg-jade-200 text-jade-700'
            }`}>
              {user?.subscriptionPlan?.toUpperCase()} MEMBER
            </div>

            <button className="mt-4 w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-200">
              Change Photo
            </button>
          </div>

          {/* Quick Stats */}
          <div className="bg-card rounded-xl shadow-lg p-6 mt-6 border">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Account Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Member Since</span>
                <span className="font-medium text-card-foreground">June 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Connected Accounts</span>
                <span className="font-medium text-card-foreground">{user?.connectedAccounts || 1}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Transactions</span>
                <span className="font-medium text-card-foreground">127</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl shadow-lg p-8 border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-card-foreground">Personal Information</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="space-x-2">
                  <button
                    onClick={handleCancel}
                    className="bg-muted text-muted-foreground px-4 py-2 rounded-lg hover:bg-muted/80 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                  />
                ) : (
                  <p className="py-3 text-card-foreground">{user?.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                  />
                ) : (
                  <p className="py-3 text-card-foreground">{user?.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                  />
                ) : (
                  <p className="py-3 text-card-foreground">{user?.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Subscription Plan</label>
                <div className="py-3 flex items-center justify-between">
                  <span className="text-card-foreground">{user?.subscriptionPlan?.toUpperCase()}</span>
                  <a
                    href="/subscription"
                    className="text-primary hover:text-primary/80 text-sm font-medium"
                  >
                    {user?.subscriptionPlan === 'free' ? 'Upgrade' : 'Manage'} →
                  </a>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">Financial Preferences</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Primary Bank</label>
                  <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground">
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Monthly Income Range</label>
                  <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground">
                    <option>₹25,000 - ₹50,000</option>
                    <option>₹50,000 - ₹1,00,000</option>
                    <option>₹1,00,000 - ₹2,00,000</option>
                    <option>₹2,00,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Financial Goals</label>
                  <div className="space-y-2">
                    {['Emergency Fund', 'Home Purchase', 'Retirement', 'Investment'].map((goal) => (
                      <label key={goal} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border text-primary focus:ring-primary"
                        />
                        <span className="ml-2 text-sm text-card-foreground">{goal}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Risk Tolerance</label>
                  <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground">
                    <option>Conservative</option>
                    <option>Moderate</option>
                    <option>Aggressive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-card rounded-xl shadow-lg p-8 mt-6 border">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Security</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium text-card-foreground">Password</p>
                  <p className="text-sm text-muted-foreground">Last changed 2 months ago</p>
                </div>
                <button className="text-primary hover:text-primary/80 font-medium">
                  Change Password
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium text-card-foreground">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200">
                  Enable
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium text-card-foreground">Login History</p>
                  <p className="text-sm text-muted-foreground">View recent login activity</p>
                </div>
                <button className="text-primary hover:text-primary/80 font-medium">
                  View History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
