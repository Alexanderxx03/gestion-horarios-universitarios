import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      // Decode JWT payload (simple base64 decoding to extract info)
      try {
        // Save auth state natively
        localStorage.setItem('token', token);

        // Redirect to dashboard
        navigate('/dashboard', { replace: true });
      } catch (error) {
        console.error('Error decoding Google JWT:', error);
        navigate('/', { replace: true });
      }
    } else {
      // No token found, maybe redirect to login with error
      navigate('/', { replace: true });
    }
  }, [location, navigate, setAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <svg
          className="h-10 w-10 animate-spin text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
          />
        </svg>
        <p className="text-gray-300 font-medium">Iniciando sesión con Google...</p>
      </div>
    </div>
  );
};
