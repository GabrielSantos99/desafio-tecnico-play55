export const useRecaptcha = () => {
  const siteKey = '6LfTVC8rAAAAAISI8s59lF0JcXMq_XfgsHsepO5U';

  const loadScript = (): Promise<void> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') return resolve();

      if ((window as any).grecaptcha) {
        return resolve(); // já carregado
      }

      const existing = document.getElementById('recaptcha-script');
      if (existing) {
        existing.addEventListener('load', () => resolve());
        return;
      }

      const script = document.createElement('script');
      script.id = 'recaptcha-script';
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  };

  const executeRecaptcha = async (action = 'form_submit'): Promise<string | null> => {
    await loadScript();

    if (typeof window === 'undefined' || !(window as any).grecaptcha) {
      console.warn('reCAPTCHA not available');
      return null;
    }

    return await (window as any).grecaptcha.execute(siteKey, { action });
  };

  return { loadScript, executeRecaptcha };
};
