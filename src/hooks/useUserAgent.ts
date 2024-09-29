const useUserAgent = () => {
  const safari = navigator.userAgent.indexOf('Safari') > -1;
  const chrome = navigator.userAgent.indexOf('Chrome') > -1;

  return { isSafari: safari && !chrome };
};

export default useUserAgent;
