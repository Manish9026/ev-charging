import React from 'react';
import { Link } from 'react-router-dom';
import { BatteryCharging } from 'lucide-react';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center">
          <BatteryCharging className="h-12 w-12 text-primary-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <RegisterForm />
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.417 20 10c0-5.523-4.477-10-10-10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>

              <div>
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10C20 4.477 15.523 0 10 0zm-1.786 15.526c-.285.128-.57.236-.87.327-.3.091-.612.163-.94.218v1.168c0 .158-.124.288-.276.288H4.896c-.152 0-.276-.13-.276-.288v-1.168c-.904-.142-1.748-.46-2.522-.947-.804-.51-1.468-1.235-1.892-2.178-.424-.943-.636-2.025-.636-3.238 0-1.614.442-3.019 1.326-4.213.884-1.194 2.158-2.016 3.826-2.464V.762c0-.158.124-.287.276-.287h1.232c.152 0 .276.13.276.287v1.168c.328.055.64.127.94.218.3.091.585.2.87.327l.832-1.2c.046-.067.114-.113.196-.126.082-.014.164.009.226.063l1.03.882c.062.053.102.13.11.214.008.085-.018.17-.072.236l-.832 1.2c.52.447.935.97 1.25 1.572.314.602.52 1.255.616 1.958h1.394c.152 0 .276.13.276.288v1.232c0 .158-.124.288-.276.288h-1.394c-.096.703-.302 1.356-.616 1.958-.315.602-.73 1.125-1.25 1.572l.832 1.2c.054.066.08.151.072.236-.008.085-.048.161-.11.214l-1.03.882c-.062.054-.144.077-.226.063-.082-.013-.15-.059-.196-.126l-.832-1.2zm4.914-5.527c0-.65-.233-1.207-.7-1.67-.467-.462-1.03-.694-1.688-.694s-1.22.232-1.688.695c-.466.462-.7 1.018-.7 1.669 0 .65.234 1.207.7 1.669.467.463 1.03.695 1.688.695s1.22-.232 1.688-.695c.467-.462.7-1.018.7-1.669z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;