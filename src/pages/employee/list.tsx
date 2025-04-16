import {
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  ShowButton,
  TextField,
  useTable,
} from "@refinedev/antd";

import { Input, Space, Table } from "antd";

import AddRecordButton from "components/buttons/add-record-button";
import FileHandleButton from "components/buttons/file-handle-button";
import { Role, User } from "types";
import Avatar from "components/avatar";

import styles from "./styles.module.css";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { endpoints } from "@/utils/endpoints";

export const EmployeeListWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { tableProps } = useTable<User>({
    resource: "employees",
    pagination: {
      pageSize: 12,
    },
  });

  const { t } = useTranslation();

  return (
    <div className={"page-container"}>
      <List
        breadcrumb={null}
        headerButtons={() => {
          return (
            <Space>
              <FileHandleButton
                type={"Export"}
                entity={t("employees.entity")}
                onSubmit={() => console.log("submitted")}
                label={t("employees.exportButton")}
              />

              <FileHandleButton
                type="Import"
                entity={t("employees.entity")}
                accept=".xlsx"
                onSubmit={() => console.log("submitted")}
                label={t("employees.importButton")}
                template="mau_file_nhan_vien.xlsx"
              />
            </Space>
          );
        }}
        title={
          <AddRecordButton
            entity="employees"
            buttonText={t("employees.create.addBtn")}
          />
        }
      >
        <Table {...tableProps} rowKey="id">
          {/* <Table.Column dataIndex="id" title="ID" /> */}
          <Table.Column
            dataIndex="name"
            title="Tên"
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Tìm theo tên" />
              </FilterDropdown>
            )}
            render={(name, user: User) => {
              if (tableProps.loading) {
                return <TextField value="Đang tải" />;
              }

              return (
                <div className={styles.avatarAndName}>
                  <Avatar
                    userName={user?.name}
                    src={user.hasAvatar ? endpoints.retrieveAvatar(user.id) : null }
                    size="default"
                  />
                  <p>{name}</p>
                </div>
              );
            }}
          />
          <Table.Column
            dataIndex="phoneNumber"
            title="Số đt"
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Tìm theo sđt" />
              </FilterDropdown>
            )}
          />
          <Table.Column dataIndex="email" title="Email" />
          <Table.Column
            dataIndex="role"
            title="Vai trò"
            render={(role: Role) => {
              const roleKey = `employees.${Role[role]}`;
              return t(roleKey);
            }}
          />
          {/* <Table.Column dataIndex="department" title="Phòng ban" /> */}
          {/* <Table.Column dataIndex="position" title="Chức vụ" /> */}
          <Table.Column
            dataIndex="hireDate"
            title="Ngày vào làm"
            render={(hireDate: Date) => {
              return new Date(hireDate).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });
            }}
          />
          <Table.Column
            title="Thao tác"
            dataIndex="actions"
            render={(_, user: User) => (
              <Space>
                <EditButton hideText size="small" recordItemId={user.id} />
                <ShowButton hideText size="small" recordItemId={user.id} />
                <DeleteButton
                  confirmOkText=""
                  hideText
                  size="small"
                  recordItemId={user.id}
                />
              </Space>
            )}
          />
        </Table>
      </List>
      {children}
    </div>
  );
};
