import { motion } from 'framer-motion';
import Image from 'next/image';

const ChevronDownButton = () => {
  return (
    <motion.div
      className="absolute bottom-8 justify-center items-center cursor-pointer hidden sm:flex"
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
    >
      <Image
        src={'/svgs/Origami bird-pana.svg'}
        alt={'Pássaro origami verde'}
        width={100}
        height={100}
        objectFit="fill"
      />
      {/*<svg*/}
      {/*  xmlns="http://www.w3.org/2000/svg"*/}
      {/*  width="40"*/}
      {/*  height="40"*/}
      {/*  fill="none"*/}
      {/*  viewBox="0 0 24 24"*/}
      {/*  stroke="currentColor"*/}
      {/*  className="text-primary"*/}
      {/*>*/}
      {/*  <path*/}
      {/*    strokeLinecap="round"*/}
      {/*    strokeLinejoin="round"*/}
      {/*    strokeWidth="2"*/}
      {/*    d="M19 9l-7 7-7-7"*/}
      {/*  />*/}
      {/*  <path*/}
      {/*    strokeLinecap="round"*/}
      {/*    strokeLinejoin="round"*/}
      {/*    strokeWidth="2"*/}
      {/*    d="M5 15l7-7 7 7"*/}
      {/*  />*/}
      {/*</svg>*/}
    </motion.div>
  );
};

export default ChevronDownButton;
