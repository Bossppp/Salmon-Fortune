import React from 'react';

interface ProgressBarProps {
  percentage: number;
}

function ProgressBar({ percentage }: ProgressBarProps) {
  const totalSegments = 4;
  const segmentValue = 100 / totalSegments;

  const segments = Array.from({ length: totalSegments }, (_, i) => {
    const start = i * segmentValue;
    const end = (i + 1) * segmentValue;
    let fillPercent = 0;
    if (percentage >= end) {
      fillPercent = 100;
    } else if (percentage > start) {
      fillPercent = ((percentage - start) / segmentValue) * 100;
    }
    return fillPercent;
  });

  return (
    <div className="ml-2 w-3/4 flex items-center gap-x-1">
      {segments.map((fill, index) => (
        <div
          key={index}
          className="w-full h-2.5 flex flex-col justify-center overflow-hidden bg-white text-xs text-white text-center whitespace-nowrap transition duration-500"
          role="progressbar"
          aria-valuenow={fill}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            style={{ width: `${fill}%` }}
            className="h-full bg-orange-700 transition-all duration-500"
          />
        </div>
      ))}
      <div>
        <div className="w-10 text-end">
          <span className="text-sm text-bg mt-2 rounded-md px-1 bg-primary w-fit">{percentage}%</span>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
