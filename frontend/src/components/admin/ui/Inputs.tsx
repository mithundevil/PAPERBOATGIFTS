"use client";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className = "", ...props }: InputProps) => {
  return (
    <div className="space-y-2.5 w-full group/field">
      {label && <label className="text-[10px] uppercase tracking-[0.4em] font-black text-neutral-600 block ml-1 group-focus-within/field:text-[#6366F1] transition-colors">{label}</label>}
      <div className="relative">
        <input 
          className={`w-full bg-[#111111] border border-[#1F1F1F] text-white px-6 py-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 focus:border-[#6366F1] transition-all duration-500 placeholder:text-neutral-800 text-sm shadow-inner group-hover/field:border-neutral-700 ${error ? 'border-red-500/50 focus:ring-red-500/20 focus:border-red-500' : ''} ${className}`}
          {...props}
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#6366F1]/5 to-transparent opacity-0 group-focus-within/field:opacity-100 pointer-events-none transition-opacity duration-700" />
      </div>
      {error && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1 mt-1">{error}</p>}
    </div>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = ({ label, error, className = "", ...props }: TextareaProps) => {
  return (
    <div className="space-y-2.5 w-full group/field">
      {label && <label className="text-[10px] uppercase tracking-[0.4em] font-black text-neutral-600 block ml-1 group-focus-within/field:text-[#6366F1] transition-colors">{label}</label>}
      <div className="relative">
        <textarea 
          className={`w-full bg-[#111111] border border-[#1F1F1F] text-white px-6 py-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 focus:border-[#6366F1] transition-all duration-500 placeholder:text-neutral-800 text-sm resize-none min-h-[120px] shadow-inner group-hover/field:border-neutral-700 ${error ? 'border-red-500/50 focus:ring-red-500/20 focus:border-red-500' : ''} ${className}`}
          {...props}
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#6366F1]/5 to-transparent opacity-0 group-focus-within/field:opacity-100 pointer-events-none transition-opacity duration-700" />
      </div>
      {error && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1 mt-1">{error}</p>}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
}

export const Select = ({ label, options, className = "", ...props }: SelectProps) => {
  return (
    <div className="space-y-2.5 w-full group/field">
      {label && <label className="text-[10px] uppercase tracking-[0.4em] font-black text-neutral-600 block ml-1 group-focus-within/field:text-[#6366F1] transition-colors">{label}</label>}
      <div className="relative">
        <select 
          className={`w-full bg-[#111111] border border-[#1F1F1F] text-white px-6 py-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 focus:border-[#6366F1] transition-all duration-500 text-sm appearance-none shadow-inner group-hover/field:border-neutral-700 cursor-pointer ${className}`}
          {...props}
        >
          {options.map(opt => <option key={opt.value} value={opt.value} className="bg-[#111111] text-white py-2">{opt.label}</option>)}
        </select>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-600 group-focus-within/field:text-[#6366F1] transition-colors">
           <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
        </div>
      </div>
    </div>
  );
};
