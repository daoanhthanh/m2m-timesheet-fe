import { HttpError, useOne } from "@refinedev/core";
import { AnnualLeaveRemainder } from "@/domains";
import { fakeAnnualLeaveRemainder } from "@/providers/fake-provider-data";
import { useTranslation } from "react-i18next";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

export const PaidVacationTime = () => {
  const { isLoading, isError } = useOne<AnnualLeaveRemainder, HttpError>({
    resource: "paidLeaveRemainders",
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
