import {
  EditButton,
  FilterDropdown,
  List,
  ShowButton,
  TextField,
  useTable,
} from "@refinedev/antd";

import { Input, Space, Table } from "antd";

import ListTitleButton from "@/components/buttons/list-title-button";
import FileHandleButton from "@/components/buttons/file-handle-button";
import User from "@/domains/user/user";
import Avatar from "@/components/avatar";

import styles from "./styles.module.css";

export const EmployeeList = () => {
  const { tableProps } = useTable<User>();

  return (
    <div className={"page-container"}>
      <List
        headerButtons={() => {
          return (
            <Space>
              <FileHandleButton
                type={"Export"}
                entity={"nhân viên"}
                onSubmit={() => console.log("submitted")}
                label={"Xuất danh sách"}
              />

              <FileHandleButton
                type="Import"
                entity="nhân viên"
                accept=".xlsx"
                onSubmit={() => console.log("submitted")}
                label="Nhập danh sách"
                mockedFile="mau_file_nhan_vien.xlsx"
              />
            </Space>
          );
        }}
        title={
          <ListTitleButton toPath="employees" buttonText="Thêm nhân viên" />
        }
      >
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
    </div>
  );
};
