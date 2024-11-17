import { useEffect, useState } from "react";
import { Select } from "antd";
import User from "@/domains/user/user";
import { get } from "@/providers/http/request";
import { endpoints } from "@/providers/endpoints";
import { Pagination } from "@/domains";
import styles from "./styles.module.css";

export interface EmProps {
  currentUserId: string;
  currentUserName: string;
}

interface OptionType {
  label: string;
  value: string;
}

export default function EmployeeSelection(props: EmProps) {
  const [employees, setEmployees] = useState<OptionType[]>([]);

  const fetchEmployees = async () => {
    const response = await get<Pagination<User>>(endpoints.employee.list);
    const data = response.data().data;

    setEmployees(
      data.map((user) => {
        return {
          label: user.userFullName,
          value: user.id,
        };
      }),
    );
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filterOption = (inputValue: string, option?: OptionType): boolean =>
    option
      ? option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
      : false;

  const onSearch = (value: string) => {};

  return (
    <Select
      showSearch
      className={styles.selectEmployee}
      placeholder="Chọn nhân viên"
      onSearch={onSearch}
      filterOption={filterOption}
      options={employees}
    />
  );
}
