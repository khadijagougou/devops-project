import React, { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';

// ─── FormField ────────────────────────────────────────────────────────────────

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ label, error, required, children }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-semibold dark:text-gray-300 uppercase tracking-wider">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {children}
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
);

// ─── FormInput ────────────────────────────────────────────────────────────────

type FormInputProps = InputHTMLAttributes<HTMLInputElement>;

export const FormInput: React.FC<FormInputProps> = ({ className = '', ...props }) => (
  <input
    className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-black/[0.10]
      dark:text-gray-300  text-sm placeholder:text-white/25
      focus:outline-none focus:border-white/30 focus:bg-white/[0.08]
      transition-all duration-200 ${className}`}
    {...props}
  />
);

// ─── FormTextarea ─────────────────────────────────────────────────────────────

type FormTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { rows?: number };

export const FormTextarea: React.FC<FormTextareaProps> = ({ className = '', rows = 3, ...props }) => (
  <textarea
    rows={rows}
    className={`w-full px-4 py-2.5 rounded-xl resize-none bg-white/[0.05] border border-white/[0.10]
      text-white text-sm placeholder:text-white/25
      focus:outline-none focus:border-white/30 focus:bg-white/[0.08]
      transition-all duration-200 ${className}`}
    {...props}
  />
);

// ─── FormSelect ───────────────────────────────────────────────────────────────

type FormSelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export const FormSelect: React.FC<FormSelectProps> = ({ className = '', children, ...props }) => (
  <select
    className={`w-full px-4 py-2.5 rounded-xl bg-[#1a1a1a] border border-white/[0.10]
      text-white text-sm focus:outline-none focus:border-white/30
      transition-all duration-200 cursor-pointer ${className}`}
    {...props}
  >
    {children}
  </select>
);

// ─── FormActions ──────────────────────────────────────────────────────────────

interface FormActionsProps {
  onCancel?: () => void;
  submitLabel?: string;
  loading?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({ onCancel, submitLabel = 'Enregistrer', loading = false }) => (
  <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.06] mt-6">
    {onCancel && (
      <button type="button" onClick={onCancel}
        className="cursor-pointer px-5 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/[0.06] transition-all">
        Annuler
      </button>
    )}
    <button type="submit" disabled={loading}
      className="cursor-pointer px-5 py-2.5 rounded-xl text-sm font-semibold bg-white text-black hover:bg-white/90 transition-all disabled:opacity-50 shadow-lg">
      {loading ? 'Enregistrement...' : submitLabel}
    </button>
  </div>
);

// ─── DeleteConfirm ────────────────────────────────────────────────────────────

interface DeleteConfirmProps {
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}

export const DeleteConfirm: React.FC<DeleteConfirmProps> = ({
  onConfirm, onCancel, message = 'Cette action est irréversible. Voulez-vous continuer ?'
}) => (
  <div>
    <p className="text-white/50 text-sm">{message}</p>
    <div className="flex justify-end gap-3 mt-6">
      <button onClick={onCancel} className="px-4 py-2 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/[0.06] transition-all">
        Annuler
      </button>
      <button onClick={onConfirm} className="px-4 py-2 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-all">
        Supprimer
      </button>
    </div>
  </div>
);
