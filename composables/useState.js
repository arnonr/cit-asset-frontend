// export const useLang = () => useState(() => 'th');
export const useSkin = () => useState(() => "skin-light");

export const useNotification = () =>
  useState(() => {
    return {
      location: 0,
      holder: 0,
      fix: 0,
    };
  });
