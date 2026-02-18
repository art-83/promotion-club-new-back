interface FindRecommendedOptionsDTO {
  tagIds: string[];
  excludePromotionIds: string[];
  limit?: number;
  join_file?: boolean;
}

export default FindRecommendedOptionsDTO;
