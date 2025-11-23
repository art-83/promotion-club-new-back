interface PromotionTickerDashboardDTO {
  total_revenue: number;
  best_seller_items: {
    name: string;
    revenue: number;
    total_items_selled: number;
  }[];
}

export default PromotionTickerDashboardDTO;
