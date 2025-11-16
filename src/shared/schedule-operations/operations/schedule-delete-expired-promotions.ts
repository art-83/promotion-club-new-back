import cron from "node-cron";
import { container } from "tsyringe";
import DeleteExpiredPromotionsService from "../../../modules/promotions/services/promotions/delete-expired-promotions.service";
import cronConfig from "../../../config/cron.config";

async function scheduleDeleteExpiredPromotions() {
  cron.schedule(cronConfig.interval, async () => {
    const deleteExpiredPromotionsService = container.resolve(DeleteExpiredPromotionsService);
    await deleteExpiredPromotionsService.execute();
  });
}

export default scheduleDeleteExpiredPromotions;
