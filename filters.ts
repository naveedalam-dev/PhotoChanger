/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import type { AdjustmentValues } from './types';

export interface FilterPreset {
  name: string;
  values: AdjustmentValues;
}

export const filterPresets: FilterPreset[] = [
  {
    name: 'Vintage',
    values: { brightness: 115, contrast: 95, saturation: 70 },
  },
  {
    name: 'Noir',
    values: { brightness: 110, contrast: 140, saturation: 0 },
  },
  {
    name: 'Vibrant',
    values: { brightness: 100, contrast: 115, saturation: 140 },
  },
  {
    name: 'Summer',
    values: { brightness: 110, contrast: 105, saturation: 120 },
  },
  {
    name: 'Winter',
    values: { brightness: 105, contrast: 110, saturation: 85 },
  },
  {
    name: 'Sepia',
    // A simplified sepia-like effect using available controls.
    // True sepia requires a `sepia()` filter, but this gives a warm, desaturated look.
    values: { brightness: 110, contrast: 90, saturation: 50 },
  },
];
