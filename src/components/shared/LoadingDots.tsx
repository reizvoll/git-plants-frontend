export const LoadingDots = () => {
  return (
    <span className="inline-block">
      <span className="inline-block animate-[loadingText_3s_steps(3)_infinite]" style={{ animationDelay: "0s" }}>
        .
      </span>
      <span className="inline-block animate-[loadingText_3s_steps(3)_infinite]" style={{ animationDelay: "0.15s" }}>
        .
      </span>
      <span className="inline-block animate-[loadingText_3s_steps(3)_infinite]" style={{ animationDelay: "0.3s" }}>
        .
      </span>
    </span>
  );
};
