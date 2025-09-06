type LoadingTextProps = {
  text: string;
  className: string;
};

const LoadingText = ({ text, className }: LoadingTextProps) => {
  return (
    <div className={`${className}`}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block animate-[loadingText_3s_steps(3)_infinite]"
          style={{
            animationDelay: `${index * 0.15}s`,
            display: "inline-block",
            margin: "0 0.5px"
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default LoadingText;
