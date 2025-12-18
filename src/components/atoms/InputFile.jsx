import React from 'react';

function InputFile({ onChange, accept = "image/*", className = "", disabled = false, preview = null }) {
    return (
        <div className={`space-y-4 ${className}`}>
            <div className="group relative w-full">
                <input
                    type="file"
                    accept={accept}
                    onChange={onChange}
                    disabled={disabled}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                />
                
                <div className={`
                    flex flex-col items-center justify-center px-6 py-8
                    border-2 border-dashed rounded-xl transition-all duration-300
                    ${disabled 
                        ? 'border-slate-200 bg-slate-50 opacity-60' 
                        : 'border-slate-300 bg-white group-hover:border-indigo-500 group-hover:bg-indigo-50/30'
                    }
                `}>
                    <div className={`
                        p-3 rounded-full mb-3 transition-colors
                        ${disabled ? 'bg-slate-100 text-slate-400' : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 group-hover:text-indigo-700'}
                    `}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    
                    <p className="text-sm font-medium text-slate-700">
                        {disabled ? "Procesando..." : "Sube una imagen"}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">PNG, JPG hasta 5MB</p>
                </div>
            </div>

            {preview && (
                <div className="relative group w-32 h-32 mx-auto">
                    <div className="absolute inset-0 bg-slate-200 rounded-xl animate-pulse" />
                    <img 
                        src={preview} 
                        alt="Vista previa" 
                        className="relative w-full h-full object-cover rounded-xl shadow-lg border-2 border-white ring-1 ring-slate-100" 
                    />
                    <div className="absolute inset-0 rounded-xl ring-inset ring-1 ring-black/10"></div>
                </div>
            )}
        </div>
    );
}

export default InputFile;