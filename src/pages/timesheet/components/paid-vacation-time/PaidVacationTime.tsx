import { HttpError, useOne } from "@refinedev/core";
import { AnnualLeaveRemainder } from "types";
import { fakeAnnualLeaveRemainder } from "@/utils/fake-provider-data";
import { useTranslation } from "react-i18next";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { getUserSession } from "@/providers/storage/localStorage";

export const PaidVacationTime = () => {
  // Lưu ý rằng cách làm dưới đây chỉ phù hợp trong trường hợp biết
  // chắc chắn user đã login, và không thực hiện bất cứ thao tác xác thực nào.
  // Trong trường hợp cần xác thực, cần phải sử dụng hook useGetIdentity<T>(),
  const user = getUserSession();

  const { isLoading, isError } = useOne<AnnualLeaveRemainder, HttpError>({
    resource: "annual-leave-remains",
    id: "1",
    queryOptions: {
      enabled: true,
    },
  });

  const { t } = useTranslation();

  const data = fakeAnnualLeaveRemainder;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <div>
      <div className="flex space-x-2">
        <p>
          {t("timesheet.paidLeaveRemainder")}:{" "}
          <span className="text-xl">
            {data?.data.remainingAnnualLeaveHours}/
            {data?.data.totalAnnualLeaveHours}
          </span>
        </p>
        <Tooltip title={t("timesheet.tooltips.annualLeave")}>
          <InfoCircleOutlined
            color={"#2db7f5"}
            twoToneColor={["black", "red"]}
          />
        </Tooltip>
      </div>

      <div className="flex space-x-2">
        <p>
          {t("timesheet.specialLeaveRemainder")}:{" "}
          <span className="text-xl">
            {data?.data.remainingSpecialLeaveHours}/
            {data?.data.totalSpecialLeaveHours}
          </span>
        </p>
        <Tooltip title={t("timesheet.tooltips.specialLeave")}>
          <InfoCircleOutlined
            color={"#2db7f5"}
            twoToneColor={["black", "red"]}
          />
        </Tooltip>
      </div>
    </div>
  );
};
