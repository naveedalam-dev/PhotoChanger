/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface WardrobeItem {
  id: string;
  name: string;
  url: string;
}

export interface OutfitLayer {
  garment: WardrobeItem | null; // null represents the base model layer
  poseImages: Record<string, string>; // Maps pose instruction to image URL
}

export interface AdjustmentValues {
  brightness: number;
  contrast: number;
  saturation: number;
}

export interface SavedOutfit {
  id: string;
  name: string;
  thumbnail: string;
  modelImageUrl: string;
  outfitHistory: OutfitLayer[];
  currentOutfitIndex: number;
  adjustments: AdjustmentValues;
  createdAt: string;
}

export interface User {
  email: string;
}
