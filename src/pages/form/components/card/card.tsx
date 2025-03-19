// import React from "react";
//
// import { useDelete, useNavigation } from "@refinedev/core";
// // import { GetFieldsFromList } from "@refinedev/nestjs-query";
//
// import {
//   DeleteOutlined,
//   EllipsisOutlined,
//   EyeOutlined,
// } from "@ant-design/icons";
// import { Button, Dropdown, MenuProps } from "antd";
//
// // import { ContactStatusTag, CustomAvatar, Text } from "@/components";
// // import { CustomerListQuery } from "@/graphql/types";
//
// import styles from "./index.module.css";
// import { ContactCardSkeleton } from "./skeleton";
// import {Form} from "types";
//
// type FormCardProps = {
//   form: Form
// };
//
// export const CustomerCard: React.FC<FormCardProps> = ({ form }) => {
//   const { show } = useNavigation();
//   const { mutate: deleteMutate } = useDelete();
//
//   if (!form) return <ContactCardSkeleton />;
//
//   const { id, name, creatorName, views, responses, published, settings } = form;
//   const items: MenuProps["items"] = [
//     {
//       label: "Show",
//       key: "show",
//       icon: <EyeOutlined />,
//       onClick: () => {
//         show("contacts", id, "replace");
//       },
//     },
//     {
//       label: "Delete",
//       key: "delete",
//       danger: true,
//       icon: <DeleteOutlined />,
//       onClick: () => {
//         deleteMutate({
//           resource: "contacts",
//           id,
//         });
//       },
//     },
//   ];
//
//   return (
//     <div className={styles.container}>
//       <Dropdown
//         className={styles.dropdown}
//         menu={{ items }}
//         trigger={["click"]}
//       >
//         <Button type="text" icon={<EllipsisOutlined />} />
//       </Dropdown>
//
//       <div className={styles.personal}>
//         <CustomAvatar size={64} src={avatarUrl} name={name} />
//         <Text
//           className={styles.name}
//           strong
//           ellipsis={{
//             tooltip: true,
//           }}
//         >
//           {name}
//         </Text>
//         <Text
//           ellipsis={{
//             tooltip: true,
//           }}
//           className={styles.email}
//         >
//           {email}
//         </Text>
//         <ContactStatusTag status={status} />
//       </div>
//
//       {/*<div className={styles.company}>*/}
//       {/*  <Text ellipsis={{ tooltip: true }}>*/}
//       {/*    {(jobTitle && `${jobTitle} at`) || <span>&nbsp;</span>}*/}
//       {/*  </Text>*/}
//       {/*  <div className={styles.companyName}>*/}
//       {/*    <Text*/}
//       {/*      strong*/}
//       {/*      ellipsis={{*/}
//       {/*        tooltip: true,*/}
//       {/*      }}*/}
//       {/*    >*/}
//       {/*      <CustomAvatar*/}
//       {/*        src={company.avatarUrl}*/}
//       {/*        name={company.name}*/}
//       {/*        shape="square"*/}
//       {/*        style={{*/}
//       {/*          display: "inline-flex",*/}
//       {/*          marginRight: 8,*/}
//       {/*        }}*/}
//       {/*      />*/}
//       {/*      {company.name}*/}
//       {/*    </Text>*/}
//       {/*  </div>*/}
//       {/*</div>*/}
//     </div>
//   );
// };
