import { useEffect, useState } from "react";
import { RxPinTop } from "react-icons/rx";

import { IScrollToTopButtonProps } from "../../models";

const ScrollToTopButton: React.FC<IScrollToTopButtonProps> = ({
  targetRef,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = targetRef?.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [targetRef]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed z-50 p-3 rounded-full shadow-lg text-typewriter-text bg-filter-bg bottom-4 right-4 focus-visible-outline focus-visible-rounded"
        >
          <RxPinTop className="w-6 h-6" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
