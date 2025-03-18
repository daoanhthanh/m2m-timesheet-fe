import { List, useTable } from "@refinedev/antd";

import { Space } from "antd";

import AddRecordButton from "@/components/buttons/add-record-button";
import FileHandleButton from "@/components/buttons/file-handle-button";
import { BaseResponse, Form, User } from "types";

import { FormItem } from "@/pages/form/components";
import { Suspense } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useCustom } from "@refinedev/core";

function FormList() {
  const { data, isLoading, isError } = useCustom<BaseResponse<Form[]>>({
    url: "forms",
    method: "get",
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LoadingOutlined />
      </div>
    );
  }

  if (isError) {
    return <div>Failed to load data</div>;
  }

  let forms = data?.data?.data;
  return (
    <>
      {
        // @ts-ignore
        forms.map((form) => (
          <FormItem
            key={form.id}
            id={form.id}
            formId={form.formId}
            name={form.name}
            published={form.published}
            createdAt={form.createdAt}
            responses={form.responses}
            views={form.views}
            backgroundColor={form.settings.backgroundColor}
          />
        ))
      }
    </>
  );
}

export const FormListPage = () => {
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
          <AddRecordButton entity="employees" buttonText="Tạo mẫu đơn mới" />
        }
      >
        {/*@ts-ignore*/}
        {/*<Table {...tableProps} rowKey="id">*/}
        {/*  <Table.Column dataIndex="id" title="ID" />*/}
        {/*  <Table.Column*/}
        {/*    dataIndex="fullName"*/}
        {/*    title="Tên"*/}
        {/*    filterDropdown={(props) => (*/}
        {/*      <FilterDropdown {...props}>*/}
        {/*        <Input placeholder="Tìm theo tên" />*/}
        {/*      </FilterDropdown>*/}
        {/*    )}*/}
        {/*    render={(userNane, user: User) => {*/}
        {/*      if (tableProps.loading) {*/}
        {/*        return <TextField value="Đang tải" />;*/}
        {/*      }*/}

        {/*      return (*/}
        {/*        <div className={styles.avatarAndName}>*/}
        {/*          <Avatar*/}
        {/*            userName={user?.userFullName}*/}
        {/*            src={user?.avatarUrl}*/}
        {/*            size="default"*/}
        {/*          />*/}
        {/*          <p>{userNane}</p>*/}
        {/*        </div>*/}
        {/*      );*/}
        {/*    }}*/}
        {/*  />*/}
        {/*  <Table.Column*/}
        {/*    dataIndex={"userPhoneNumber"}*/}
        {/*    title="Số đt"*/}
        {/*    filterDropdown={(props) => (*/}
        {/*      <FilterDropdown {...props}>*/}
        {/*        <Input placeholder="Tìm theo sđt" />*/}
        {/*      </FilterDropdown>*/}
        {/*    )}*/}
        {/*  />*/}
        {/*  <Table.Column*/}
        {/*    title="Thao tác"*/}
        {/*    dataIndex="actions"*/}
        {/*    render={(_, user: User) => (*/}
        {/*      <Space>*/}
        {/*        <EditButton hideText size="small" recordItemId={user.id} />*/}
        {/*        <ShowButton hideText size="small" recordItemId={user.id} />*/}
        {/*      </Space>*/}
        {/*    )}*/}
        {/*  />*/}
        {/*</Table>*/}
        <div
          className="grid gap-4  grid-cols-2
           md:grid-cols-5
           lg:grid-cols-3
           xl:grid-cols-5
           "
        >
          <Suspense
            fallback={[1, 2, 3, 4].map((item) => (
              <LoadingOutlined />
              // <Loader size="3rem" className="animate-spin" />
            ))}
          >
            <FormList />
          </Suspense>
        </div>
      </List>
    </div>
  );
};
