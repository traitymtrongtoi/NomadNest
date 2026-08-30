import React, { useState } from 'react';
import { UserRole } from '../../types';
import { RoleSelection } from '../auth/RoleSelection';
import { AuthForm } from '../auth/AuthForm';

interface LoginScreenProps {
  onSelectRoleLogin: (role: UserRole) => void;
  onContinueEmail?: (role: UserRole) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onSelectRoleLogin,
}) => {
  const [step, setStep] = useState<'role_select' | 'auth_form'>('role_select');
  const [selectedRole, setSelectedRole] = useState<UserRole>('nomad_user');
  const [lang, setLang] = useState<'VI' | 'EN'>('VI');

  const handleRoleSelected = (role: UserRole) => {
    setSelectedRole(role);
    setStep('auth_form');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative overflow-x-hidden bg-gradient-to-br from-[#003829] via-[#002B1F] to-[#001710] text-white">
      {/* App Top Header */}
      <header className="w-full flex items-center justify-between px-6 pt-6 pb-4 max-w-3xl mx-auto z-20">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-primary-fixed text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            spa
          </span>
          <span className="font-bold text-2xl tracking-tight text-white">NomadNest</span>
        </div>
      </header>

      {/* Main Container Container */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 pb-12 max-w-2xl mx-auto w-full z-10">
        {step === 'role_select' ? (
          <RoleSelection
            onSelectRole={handleRoleSelected}
          />
        ) : (
          <AuthForm
            role={selectedRole}
            onBackToRoleSelect={() => setStep('role_select')}
            onAuthSuccess={onSelectRoleLogin}
          />
        )}
      </main>
    </div>
  );
};
