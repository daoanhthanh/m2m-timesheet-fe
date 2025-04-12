import {
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
import { User } from "types";
import Avatar from "components/avatar";

import styles from "./styles.module.css";
import * as React from "react";
import { useTranslation } from "react-i18next";

export const EmployeeListWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { tableProps } = useTable<User>();
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
        {/*@ts-ignore*/}
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title="ID" />
          <Table.Column
            dataIndex="fullName"
            title="Tên"
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Tìm theo tên" />
              </FilterDropdown>
            )}
            render={(userNane, user: User) => {
              if (tableProps.loading) {
                return <TextField value="Đang tải" />;
              }

              return (
                <div className={styles.avatarAndName}>
                  <Avatar
                    userName={user?.userFullName}
                    src={user?.avatarUrl}
                    size="default"
                  />
                  <p>{userNane}</p>
                </div>
              );
            }}
          />
          <Table.Column
            dataIndex={"userPhoneNumber"}
            title="Số đt"
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Tìm theo sđt" />
              </FilterDropdown>
            )}
          />
          <Table.Column
            title="Thao tác"
            dataIndex="actions"
            render={(_, user: User) => (
              <Space>
                <EditButton hideText size="small" recordItemId={user.id} />
                <ShowButton hideText size="small" recordItemId={user.id} />
              </Space>
            )}
          />
        </Table>
      </List>
      {children}
    </div>
  );
};
