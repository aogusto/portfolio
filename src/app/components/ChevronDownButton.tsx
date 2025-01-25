import { motion } from 'framer-motion';

const ChevronDownButton = () => {
  return (
    <motion.div
      className="absolute bottom-4 justify-center items-center cursor-pointer hidden xl:flex"
      animate={{
        y: [0, -20, 0, -15, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
        delay: 1,
      }}
      onClick={() =>
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth',
        })
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="text-primary"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </motion.div>
  );
};

export default ChevronDownButton;
