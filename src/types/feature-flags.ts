export interface FeatureFlags {
  excludePendingFromSummary: boolean;
}

export type FeatureFlagKey = keyof FeatureFlags;

export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  excludePendingFromSummary: false,
};
