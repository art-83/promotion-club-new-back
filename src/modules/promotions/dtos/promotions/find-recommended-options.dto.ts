interface FindRecommendedOptionsDTO {
  tagIds: string[];
  excludePromotionIds: string[];
  limit?: number;
  join_image?: boolean;
}

export default FindRecommendedOptionsDTO;
