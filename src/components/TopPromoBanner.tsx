import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export function TopPromoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-[#451A03] text-[#FDFBF7] px-4 py-2 text-xs font-medium relative z-30 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 text-center truncate">
          <Sparkles className="w-3.5 h-3.5 text-[#F0C987] shrink-0" />
          <span className="truncate">
            <strong className="font-semibold text-[#F0C987]">Fresh batches ready today!</strong> Use code <code className="bg-[#78350F] px-1.5 py-0.5 rounded text-[#FEF3C7] font-mono text-[11px]">HOMEBITE10</code> for 10% off · Free doorstep delivery on orders above ₹499
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-[#D6CEBE] hover:text-white p-0.5 rounded transition-colors shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
