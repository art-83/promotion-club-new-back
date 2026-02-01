import DefaultQueryOptions from "../../../../shared/infra/orm/dtos/default-query-options.dto";
import UserPushToken from "../../infra/orm/entities/user-push-token.entity";

interface UserPushTokenQueryOptions extends UserPushToken, DefaultQueryOptions {
  user_id: string;
}

export default UserPushTokenQueryOptions;
