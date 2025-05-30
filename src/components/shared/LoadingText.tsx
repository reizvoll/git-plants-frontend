export const LoadingText = ({ text }: { text: string }) => {
  return (
    <div className="font-pretendard text-body1 text-text-04">
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
