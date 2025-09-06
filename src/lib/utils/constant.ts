export const ERROR_MESSAGES = {
  400: {
    NOT_ENOUGH_SEEDS: { label: "Not enough seeds", message: "씨앗이 부족합니다." },
    ALREADY_OWN_ITEM: { label: "You already own this item", message: "이미 보유한 아이템입니다." },
    VALID_SEED_COUNT_REQUIRED: { label: "Valid seed count is required", message: "씨앗이 필요합니다." }
  },
  404: {
    GARDEN_ITEM_NOT_FOUND: { label: "Garden item not found", message: "아이템을 찾을 수 없습니다." }
  },
  500: {
    ERROR_USING_SEEDS: { label: "Error using seeds", message: "Seed 사용 중 오류가 발생했습니다." }
  }
} as const;
