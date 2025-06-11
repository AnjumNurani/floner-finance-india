
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Camera, Eye, Shield, Clock } from 'lucide-react';

const Profile = () => {
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

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

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedUser = { ...user!, profilePicture: e.target?.result as string };
        setUser(updatedUser);
        localStorage.setItem('enro-user', JSON.stringify(updatedUser));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    // Simulate password change
    alert('Password changed successfully!');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleEnable2FA = () => {
    setIs2FAEnabled(!is2FAEnabled);
    alert(is2FAEnabled ? 'Two-Factor Authentication disabled' : 'Two-Factor Authentication enabled');
  };

  const mockLoginHistory = [
    { date: '2024-06-11 09:30 AM', device: 'Chrome on Windows', location: 'Mumbai, India' },
    { date: '2024-06-10 02:15 PM', device: 'Mobile App', location: 'Mumbai, India' },
    { date: '2024-06-09 11:45 AM', device: 'Safari on Mac', location: 'Mumbai, India' },
    { date: '2024-06-08 06:20 PM', device: 'Chrome on Android', location: 'Mumbai, India' }
  ];

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
            <div className="relative w-24 h-24 mx-auto mb-4">
              {user?.profilePicture ? (
                <img src={user.profilePicture} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-jade-500 to-jade-600 rounded-full flex items-center justify-center text-primary-foreground text-3xl font-bold">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
              )}
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

            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4 w-full" variant="default">
                  <Camera className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Profile Photo</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-24 h-24">
                      {user?.profilePicture ? (
                        <img src={user.profilePicture} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                      ) : (
                        <div className="w-24 h-24 bg-gradient-to-br from-jade-500 to-jade-600 rounded-full flex items-center justify-center text-primary-foreground text-3xl font-bold">
                          {user?.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Current Password</label>
                        <input
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">New Password</label>
                        <input
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <Button onClick={handlePasswordChange} className="w-full">
                        Update Password
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium text-card-foreground">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">
                    {is2FAEnabled ? 'Currently enabled' : 'Add an extra layer of security'}
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant={is2FAEnabled ? "destructive" : "default"}>
                      <Shield className="w-4 h-4 mr-2" />
                      {is2FAEnabled ? 'Disable' : 'Enable'}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {is2FAEnabled ? 'Disable' : 'Enable'} Two-Factor Authentication
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {is2FAEnabled 
                          ? 'Are you sure you want to disable two-factor authentication? This will make your account less secure.'
                          : 'Two-factor authentication adds an extra layer of security to your account. You will need to enter a code from your authenticator app each time you log in.'
                        }
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleEnable2FA}>
                        {is2FAEnabled ? 'Disable' : 'Enable'} 2FA
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium text-card-foreground">Login History</p>
                  <p className="text-sm text-muted-foreground">View recent login activity</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Clock className="w-4 h-4 mr-2" />
                      View History
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Login History</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {mockLoginHistory.map((login, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{login.device}</p>
                            <p className="text-xs text-muted-foreground">{login.location}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{login.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
