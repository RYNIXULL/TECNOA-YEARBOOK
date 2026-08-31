/**
 * Custom Toast Notification System
 * Replaces native alert() with vintage-themed telegram notification toasts.
 * Uses Lucide icons and adheres to all custom security and design guidelines.
 */

// Override native alert to prevent ugly browser popups
window.alert = function(message) {
  showToast(message, 'info');
};

const iconMap = {
  success: 'check-circle-2',
  error: 'alert-octagon',
  info: 'file-text',
  warning: 'alert-triangle'
};

const toastThemeMap = {
  success: 'border-[#2d6a4f] text-[#1b4332] bg-[#d8f3dc]',
  error: 'border-[#9e2a2b] text-[#540b0e] bg-[#f8d7da]',
  info: 'border-[#1c1815] text-[#1c1815] bg-[#f4f0e6]',
  warning: 'border-[#b08968] text-[#582f0e] bg-[#ede0d4]'
};

window.showToast = function(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toastId = 'toast-' + Math.random().toString(36).substr(2, 9);
  const iconName = iconMap[type] || iconMap.info;
  const themeClasses = toastThemeMap[type] || toastThemeMap.info;

  const toast = document.createElement('div');
  toast.id = toastId;
  toast.className = `flex items-center gap-3 px-4 py-3 border-2 shadow-2xl toast-enter ${themeClasses}`;
  toast.style.fontFamily = 'var(--font-typewriter)';

  toast.innerHTML = `
    <i data-lucide="${iconName}" class="w-5 h-5 shrink-0"></i>
    <div class="flex flex-col">
      <span class="text-[9px] uppercase tracking-widest font-bold opacity-70">DISPATCH NOTIFICATION</span>
      <span class="text-xs font-semibold leading-tight">${message}</span>
    </div>
    <button onclick="document.getElementById('${toastId}').remove()" class="ml-4 opacity-50 hover:opacity-100 transition-opacity p-1">
      <i data-lucide="x" class="w-4 h-4"></i>
    </button>
  `;

  container.appendChild(toast);
  
  // Initialize Lucide icons on newly inserted toast
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Auto remove toast after 3.5 seconds
  setTimeout(() => {
    const el = document.getElementById(toastId);
    if (el) {
      el.classList.replace('toast-enter', 'toast-leave');
      setTimeout(() => el.remove(), 300);
    }
  }, 3500);
};

// Test trigger function
window.simulateError = function() {
  showToast("Arsip tidak ditemukan. Silakan periksa koneksi.", "error");
};
