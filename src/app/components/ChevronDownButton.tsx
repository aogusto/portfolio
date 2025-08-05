import { motion } from 'framer-motion';

const ChevronDownButton = () => {
  return (
    <motion.div
      className="justify-center items-center cursor-pointer hidden xl:flex relative"
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
      {/* Simple floating button */}
      <motion.div
        className="relative w-16 h-16 bg-gradient-to-br from-blue-deep to-secondary rounded-full border border-primary/50 flex items-center justify-center backdrop-blur-sm"
        whileHover={{
          scale: 1.1,
          boxShadow: '0 0 25px rgba(124, 119, 198, 0.8)',
        }}
        whileTap={{
          scale: 0.95,
        }}
      >
        {/* Chevron icon */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-cyan-bright relative z-10"
          animate={{
            y: [0, 2, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
};

export default ChevronDownButton;
