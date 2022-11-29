import { useEffect, useState, useRef } from 'react';

const useHeadsObserver = () => {
  const observer = useRef() as any;
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleObsever = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObsever, {
      rootMargin: '0% 0% -85% 0px'
    });

    const elements = [
      document?.querySelector(`#consolidation-explanation`),
      document?.querySelector(`#capital-improvement-explanation`)
    ];
    elements.forEach((elem: any) => observer?.current?.observe(elem));
    return () => observer.current?.disconnect();
  }, []);

  return { activeId };
};

export default useHeadsObserver;
