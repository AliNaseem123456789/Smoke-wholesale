import React, { useState } from 'react';
import { useAuth, RegistrationData } from '../context/AuthContext';
import { toast } from 'sonner';
import { Building, User, Mail, Phone, MapPin, FileText, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RegistrationPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegistrationData>({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    businessType: '',
    taxId: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const success = register(formData);

      if (success) {
        toast.success('Registration successful! Welcome to Soota Smoke Shop');
        navigate('/'); // go to home after registration
      } else {
        toast.error('Email already registered. Please login instead.');
      }

      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Wholesale Registration
            </h2>
            <p className="text-gray-600">
              Create your wholesale account to access exclusive pricing
            </p>
          </div>

          {/* Form (unchanged) */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* All form sections here remain the same... */}
            {/* ...Business Info, Owner Info, Address, Password, Terms */}
            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {isLoading ? 'Creating Account...' : 'Create Wholesale Account'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Login here
              </button>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
