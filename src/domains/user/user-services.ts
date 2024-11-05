import { ChangePwRequest } from "@/domains/user/user";
import { post } from "@/providers/http/request";
import { endpoints } from "@/providers/endpoints";
import { OpenNotificationParams } from "@refinedev/core";

export const changePassword = async (
  params: ChangePwRequest,
): Promise<OpenNotificationParams> => {
  const response = await post<ChangePwRequest, string>(
    endpoints.changePassword,
    params,
  );

  if (response.isFails()) {
    const message = response.getErrorMessage();
    return {
      type: "error",
      message,
      description: "Đổi mật khẩu thất bại",
    };
  }

  return {
    type: "success",
    message: response.data(),
    description: "Đổi mật khẩu thành công",
  };
};
