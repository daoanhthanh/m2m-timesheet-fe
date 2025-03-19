import { useNavigate } from "react-router-dom";

import {
  DeleteButton,
  FilterDropdown,
  getDefaultSortOrder,
} from "@refinedev/antd";
import { CrudFilters, CrudSorting, getDefaultFilter } from "@refinedev/core";
// import { GetFieldsFromList } from "@refinedev/nestjs-query";

import { PhoneOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space, Table, type TableProps } from "antd";

import { PaginationTotal, Text } from "components";
import React from "react";
import { Form } from "types";
// import { ContactStatusEnum } from "enums";
// import { CustomerListQuery } from "graphql/types";
// import { useCompaniesSelect } from "hooks/useCompaniesSelect";

// type Contact = GetFieldsFromList<CustomerListQuery>;

type Props = {
  tableProps: TableProps<Form>;
  filters: CrudFilters;
  sorters: CrudSorting;
};

// const conststatusOptions = Object.keys(ContactStatusEnum).map((key) => ({
//   label: `${key[0]}${key.slice(1).toLowerCase()}`,
//   value: ContactStatusEnum[key as keyof typeof ContactStatusEnum],
// }));

export const TableView: React.FC<Props> = ({
  tableProps,
  filters,
  sorters,
}) => {
  // const { selectProps } = useCompaniesSelect();
  const navigate = useNavigate();

  return (
    <Table
      {...tableProps}
      style={{ cursor: "pointer" }}
      onRow={(form) => {
        return {
          onClick: () => {
            navigate(`/forms/show/${form.id}`);
          },
        };
      }}
      pagination={{
        ...tableProps.pagination,
        pageSizeOptions: ["12", "24", "48", "96"],
        showTotal: (total) => (
          <PaginationTotal total={total} entityName="đơn" />
        ),
      }}
      rowKey="id"
    >
      <Table.Column
        dataIndex="name"
        title="Tên"
        width={200}
        defaultFilteredValue={getDefaultFilter("name", filters)}
        defaultSortOrder={getDefaultSortOrder("name", sorters)}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Input placeholder="Tìm theo tên" />
          </FilterDropdown>
        )}
        render={(_, record: Form) => {
          return (
            <Space>
              {/*<CustomAvatar src={record.avatarUrl} name={record.name} />*/}
              <Text>{record.name}</Text>
            </Space>
          );
        }}
      />
      <Table.Column
        dataIndex="creatorName"
        title="Người tạo"
        defaultFilteredValue={getDefaultFilter("creatorName", filters)}
        defaultSortOrder={getDefaultSortOrder("creatorName", sorters)}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Input placeholder="Tìm theo người tạo" />
          </FilterDropdown>
        )}
      />
      {/*<Table.Column*/}
      {/*  dataIndex={["company", "id"]}*/}
      {/*  title="Đối tác"*/}
      {/*  defaultFilteredValue={getDefaultFilter("company.id", filters)}*/}
      {/*  defaultSortOrder={getDefaultSortOrder("company.id", sorters)}*/}
      {/*  filterDropdown={(props) => (*/}
      {/*    <FilterDropdown {...props}>*/}
      {/*      <Select*/}
      {/*        placeholder="Tìm theo công ty"*/}
      {/*        style={{ width: 220 }}*/}
      {/*        {...selectProps}*/}
      {/*      />*/}
      {/*    </FilterDropdown>*/}
      {/*  )}*/}
      {/*  render={(_, record: Contact) => {*/}
      {/*    return <span>{record?.company.name}</span>;*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<Table.Column*/}
      {/*  dataIndex={["salesOwner", "name"]}*/}
      {/*  title="Nhân viên chăm sóc"*/}
      {/*  filterDropdown={(props) => (*/}
      {/*    <FilterDropdown {...props}>*/}
      {/*      <Input placeholder="Lọc theo tên nhân viên" />*/}
      {/*    </FilterDropdown>*/}
      {/*  )}*/}
      {/*  render={(_, record: Form) => {*/}
      {/*    return (*/}
      {/*      <Space>*/}
      {/*        <CustomAvatar*/}
      {/*          src={record.salesOwner.avatarUrl}*/}
      {/*          name={record.salesOwner.name}*/}
      {/*        />*/}
      {/*        <Text>{record.salesOwner.name}</Text>*/}
      {/*      </Space>*/}
      {/*    );*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<Table.Column*/}
      {/*  dataIndex="status"*/}
      {/*  title="Trạng thái"*/}
      {/*  sorter*/}
      {/*  defaultFilteredValue={getDefaultFilter("status", filters)}*/}
      {/*  defaultSortOrder={getDefaultSortOrder("status", sorters)}*/}
      {/*  filterDropdown={(props) => (*/}
      {/*    <FilterDropdown {...props}>*/}
      {/*      <Select*/}
      {/*        style={{ width: "200px" }}*/}
      {/*        defaultValue={null}*/}
      {/*        mode="multiple"*/}
      {/*        options={statusOptions}*/}
      {/*      />*/}
      {/*    </FilterDropdown>*/}
      {/*  )}*/}
      {/*  render={(value: ContactStatusEnum) => (*/}
      {/*    <ContactStatusTag status={value} />*/}
      {/*  )}*/}
      {/*/>*/}
      <Table.Column
        fixed="right"
        title="Thao tác"
        dataIndex="actions"
        render={(_, record: Form) => (
          <Space>
            {/*<Button*/}
            {/*  size="small"*/}
            {/*  href={`tel:${record.phone}`}*/}
            {/*  icon={<PhoneOutlined />}*/}
            {/*/>*/}
            <DeleteButton hideText size="small" recordItemId={record.id} />
          </Space>
        )}
      />
    </Table>
  );
};
