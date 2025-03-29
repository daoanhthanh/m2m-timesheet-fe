import { List, useTable } from "@refinedev/antd";
import { HttpError, useList } from "@refinedev/core";

import { Grid, Space } from "antd";

import AddRecordButton from "components/buttons/add-record-button";
import FileHandleButton from "components/buttons/file-handle-button";
import { BaseResponse, Form, User } from "types";

import { FormCard } from "pages/form/components";
import { Suspense, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useCustom } from "@refinedev/core";
import * as React from "react";

// type Props = React.PropsWithChildren;
type View = "card" | "table";

function FormList() {
  const [view, setView] = useState<View>("table");

  const screens = Grid.useBreakpoint();

  const {
    tableProps,
    searchFormProps,
    setCurrent,
    setPageSize,
    filters,
    sorters,
    setFilters,
    tableQueryResult,
  } = useTable<Form, HttpError, { name: string }>({
    pagination: {
      pageSize: 12,
    },
    sorters: {
      initial: [
        {
          field: "createdAt",
          order: "asc",
        },
      ],
    },
    filters: {
      initial: [
        {
          field: "name",
          value: undefined,
          operator: "contains",
        },
        {
          field: "responses",
          value: undefined,
          operator: "eq",
        },
        {
          field: "views",
          value: undefined,
          operator: "eq",
        },
        {
          field: "settings.primaryColor",
          value: undefined,
          operator: "eq",
        },
        {
          field: "settings.backgroundColor",
          value: undefined,
          operator: "eq",
        },
      ],
    },
    onSearch: (values) => {
      return [
        {
          field: "name",
          operator: "contains",
          value: values.name,
        },
      ];
    },
  });

  const {
    data: forms,
    isLoading,
    isError,
  } = useList<Form>({
    resource: "forms",
  });

  // const { data: formData, isLoading: isFormDataLoading, isError: isFormDataError } = useQuery<BaseResponse<Form[]>>(

  // )

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

  return (
    <>
      {forms.map((form: Form) => (
        <div key={form.id}>
          <FormCard data={form} />
        </div>
      ))}
    </>
  );
}

export const FormListPageWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { tableProps } = useTable<User>();

  return (
    <div className={"page-container"}>
      <List
        breadcrumb={null}
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
        title={<AddRecordButton entity="forms" buttonText="Tạo mẫu đơn mới" />}
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
          <Suspense fallback={<LoadingOutlined />}>
            <FormList />
          </Suspense>
        </div>
      </List>
      {/*{children}*/}
    </div>
  );
};
