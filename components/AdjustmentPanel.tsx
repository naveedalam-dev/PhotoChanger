/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import type { AdjustmentValues } from '../types';
import { filterPresets } from '../filters';

interface AdjustmentPanelProps {
  adjustments: AdjustmentValues;
  onAdjustmentsChange: (adjustments: AdjustmentValues) => void;
  isLoading: boolean;
}

const AdjustmentPanel: React.FC<AdjustmentPanelProps> = ({ adjustments, onAdjustmentsChange, isLoading }) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAdjustmentsChange({
      ...adjustments,
      [e.target.name]: parseInt(e.target.value, 10),
    });
  };

  const resetAdjustments = () => {
    onAdjustmentsChange({
      brightness: 100,
      contrast: 100,
      saturation: 100,
    });
  };

  const handlePresetClick = (values: AdjustmentValues) => {
    onAdjustmentsChange(values);
  };
  
  const isPresetActive = (presetValues: AdjustmentValues) => {
    return (
      presetValues.brightness === adjustments.brightness &&
      presetValues.contrast === adjustments.contrast &&
      presetValues.saturation === adjustments.saturation
    );
  };

  const areAdjustmentsDefault = adjustments.brightness === 100 && adjustments.contrast === 100 && adjustments.saturation === 100;

  return (
    <div className="pt-6 border-t border-gray-400/50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-serif tracking-wider text-gray-800">Adjust Image</h2>
        {!areAdjustmentsDefault && !isLoading && (
          <button 
            onClick={resetAdjustments}
            className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Reset image adjustments"
          >
            Reset
          </button>
        )}
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Filters</h3>
        <div className="grid grid-cols-3 gap-2">
          {filterPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handlePresetClick(preset.values)}
              disabled={isLoading}
              className={`w-full px-2 py-2 text-xs font-semibold text-center rounded-md transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${
                isPresetActive(preset.values)
                  ? 'bg-gray-800 text-white ring-2 ring-offset-2 ring-gray-800'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-pressed={isPresetActive(preset.values)}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="brightness" className="flex justify-between items-center text-sm font-medium text-gray-700 mb-1">
            <span>Brightness</span>
            <span className="text-gray-500">{adjustments.brightness}%</span>
          </label>
          <input
            type="range"
            id="brightness"
            name="brightness"
            min="50"
            max="150"
            value={adjustments.brightness}
            onChange={handleSliderChange}
            disabled={isLoading}
            aria-valuetext={`${adjustments.brightness}%`}
          />
        </div>
        <div>
          <label htmlFor="contrast" className="flex justify-between items-center text-sm font-medium text-gray-700 mb-1">
            <span>Contrast</span>
            <span className="text-gray-500">{adjustments.contrast}%</span>
          </label>
          <input
            type="range"
            id="contrast"
            name="contrast"
            min="50"
            max="150"
            value={adjustments.contrast}
            onChange={handleSliderChange}
            disabled={isLoading}
            aria-valuetext={`${adjustments.contrast}%`}
          />
        </div>
        <div>
          <label htmlFor="saturation" className="flex justify-between items-center text-sm font-medium text-gray-700 mb-1">
            <span>Saturation</span>
            <span className="text-gray-500">{adjustments.saturation}%</span>
          </label>
          <input
            type="range"
            id="saturation"
            name="saturation"
            min="0"
            max="200"
            value={adjustments.saturation}
            onChange={handleSliderChange}
            disabled={isLoading}
            aria-valuetext={`${adjustments.saturation}%`}
          />
        </div>
      </div>
    </div>
  );
};

export default AdjustmentPanel;
