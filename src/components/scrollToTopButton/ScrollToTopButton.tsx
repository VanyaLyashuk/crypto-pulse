import { useEffect, useState } from "react";
import { AiOutlineToTop } from "react-icons/ai";
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
          className="fixed z-50 p-3 text-white rounded-full shadow-lg bg-secondary bottom-4 right-4"
        >
          <AiOutlineToTop className="w-6 h-6" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
