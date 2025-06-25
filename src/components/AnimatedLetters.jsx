import { motion } from 'framer-motion';

export default function AnimatedLetters({ text }) {
  const letters = text.split('');

  return (
    <span className="inline-flex flex-wrap gap-x-1 cursor-default">
      {letters.map((char, index) => (
        <motion.span
          key={index}
          whileHover={{
            y: -15,
            scale: 1.4,
            rotate: [0, -15, 15, -15, 0],
            transition: { 
              type: "spring", 
              stiffness: 500, 
              damping: 8,
              rotate: {
                duration: 0.8,
                repeat: 0,
                ease: "easeInOut"
              }
            }
          }}
          animate={{
            y: [0, -5, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
          className="inline-block hover:text-blue-400 transition-colors duration-200 hover:animate-[glitch_0.2s_infinite]"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
