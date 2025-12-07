'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

// ============= TYPES =============
type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  title: string;
  message?: string;
  onClose?: () => void;
  autoDismiss?: number;
}

interface AlertItem extends AlertProps {
  id: string;
}

// ============= CONTEXT =============
const AlertContext = createContext<any>(null);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const showAlert = useCallback((alert: AlertProps) => {
    const id = Math.random().toString(36).substring(7);
    const newAlert = { ...alert, id };
    
    setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);

    // Auto remove
    if (!alert.autoDismiss) {
      setTimeout(() => {
        setAlerts(prev => prev.filter(a => a.id !== id));
      }, 5000);
    }
  }, []);

  const removeAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      
      {/* Alert Container */}
      <div className="fixed top-4 right-4 z-50 w-full max-w-sm space-y-3">
        {alerts.map((alert) => (
          <AlertComponent
            key={alert.id}
            {...alert}
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
};

// ============= HOOK =============
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within AlertProvider');
  return context;
};

// ============= ALERT COMPONENT =============
const AlertComponent: React.FC<AlertProps> = ({
  type,
  title,
  message,
  onClose,
  autoDismiss,
}) => {
  const icons = {
    success: (
      <svg className="h-5 w-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    error: (
      <svg className="h-5 w-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="h-5 w-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg className="h-5 w-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  return (
    <div className={`rounded-lg border p-4 animate-fade-in ${styles[type]}`}>
      <div className="flex items-start">
        {icons[type]}
        <div className="flex-1">
          <h3 className="font-semibold">{title}</h3>
          {message && <p className="mt-1 text-sm opacity-90">{message}</p>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 flex-shrink-0 hover:opacity-70"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

// ============= INLINE ALERT (DESIGN SYSTEM) =============
export const InlineAlert = ({
  type,
  title,
  message,
  checked,
}: {
  type: AlertType;
  title: string;
  message?: string;
  checked?: boolean;
}) => {
  const styles = {
    success: 'bg-green-50 border-green-200 text-green-700',
    error: 'bg-red-50 border-red-200 text-red-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700',
  };

  return (
    <div className={`rounded-lg border p-4 mb-3 ${styles[type]}`}>
      <div className="flex items-start">
        {checked !== undefined && (
          <input
            type="checkbox"
            checked={checked}
            readOnly
            className="h-4 w-4 mr-3 mt-1"
          />
        )}
        <div>
          <div className="font-medium">{title}</div>
          {message && <div className="mt-1 text-sm">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default AlertComponent;