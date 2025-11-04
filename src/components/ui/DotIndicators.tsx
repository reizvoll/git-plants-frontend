import { cn } from "@/lib/utils/className";

interface DotIndicatorsProps {
  totalSlides: number;
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const DotIndicators = ({ totalSlides, selectedIndex, onSelect }: DotIndicatorsProps) => (
  <div className="flex items-center justify-center gap-2" role="tablist" aria-label="slide indicators">
    {[...Array(totalSlides)].map((_, index) => (
      <button
        key={index}
        type="button"
        role="tab"
        aria-selected={index === selectedIndex}
        aria-label={`move to slide ${index + 1}`}
        className={cn(
          "h-2 w-2 rounded-full transition-all",
          index === selectedIndex ? "w-6 bg-sageGreen-800" : "bg-line-03"
        )}
        onClick={() => onSelect(index)}
      />
    ))}
  </div>
);

export default DotIndicators;
