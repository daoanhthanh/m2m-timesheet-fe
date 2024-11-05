// import {useState} from "react";
//
// import {HttpError, useOne, useUpdate} from "@refinedev/core";
//
// import {
//     CloseOutlined,
//     EditOutlined,
//     IdcardOutlined,
//     MailOutlined,
//     PhoneOutlined,
//     SafetyCertificateOutlined,
//     SecurityScanOutlined,
//     UserOutlined,
// } from "@ant-design/icons";
// import {
//     Button,
//     Card,
//     Drawer,
//     Input,
//     Space,
//     Spin,
//     Typography,
// } from "antd";
//
// import ChangePasswordModal from "@/components/change-password";
//
//
// import Avatar from "@/components/avatar";
// import Text from "@/components/text";
// import styles from "./index.module.css";
//
//
// type Props = {
//     opened: boolean;
//     setOpened: (opened: boolean) => void;
//     userId: string;
// };
//
// type FormKeys = "email" | "jobTitle" | "phone" | "timezone";
//
// export const AccountSettings = ({opened, setOpened, userId}: Props) => {
//     const [activeForm, setActiveForm] = useState<FormKeys>();
//
//     const [openChangePwd, setOpenChangePwd] = useState(false);
//
//
//     const closeModal = () => {
//         setOpened(false);
//     };
//
//     if (isError) {
//         closeModal();
//         return null;
//     }
//
//     if (isLoading) {
//         return (
//             <Drawer
//                 open={opened}
//                 width={756}
//                 styles={{
//                     body: {
//                         background: "#f5f5f5",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                     },
//                 }}
//             >
//                 <Spin/>
//             </Drawer>
//         );
//     }
//
//     const {id, name, email, jobTitle, phone, timezone, avatarUrl} =
//     data?.data ?? {};
//
//     const getActiveForm = (key: FormKeys) => {
//         if (activeForm === key) {
//             return "form";
//         }
//
//         if (!data?.data[key]) {
//             return "empty";
//         }
//
//         return "view";
//     };
//
//     return (
//         <Drawer
//             onClose={closeModal}
//             open={opened}
//             width={756}
//             styles={{
//                 body: {background: "#f5f5f5", padding: 0},
//                 header: {display: "none"},
//             }}
//         >
//             <div className={styles.header}>
//                 <Text strong>Thiết lập tài khoản</Text>
//                 <Button
//                     type="text"
//                     icon={<CloseOutlined/>}
//                     onClick={() => closeModal()}
//                 />
//             </div>
//             <div className={styles.container}>
//                 <div className={styles.name}>
//                     <Avatar
//                         style={{
//                             marginRight: "1rem",
//                             flexShrink: 0,
//                             fontSize: "40px",
//                         }}
//                         size={96}
//                         src={avatarUrl}
//                         name={name}
//                     />
//                     <Typography.Title
//                         level={3}
//                         style={{padding: 0, margin: 0, width: "100%"}}
//                         className={styles.title}
//                         editable={{
//                             onChange(value) {
//                                 updateMutation({
//                                     resource: "users",
//                                     id,
//                                     values: {name: value},
//                                     mutationMode: "optimistic",
//                                     successNotification: false,
//                                     meta: {
//                                         gqlMutation: ACCOUNT_SETTINGS_UPDATE_USER_MUTATION,
//                                     },
//                                 });
//                             },
//                             triggerType: ["text", "icon"],
//                             icon: <EditOutlined className={styles.titleEditIcon}/>,
//                         }}
//                     >
//                         {name}
//                     </Typography.Title>
//                 </div>
//                 <Card
//                     title={
//                         <Space size={15}>
//                             <UserOutlined/>
//                             <Text size="sm">Thông tin cá nhân</Text>
//                         </Space>
//                     }
//                     styles={{
//                         header: {padding: "0 12px"},
//                         body: {
//                             padding: "0",
//                         },
//                     }}
//                 >
//                     <SingleElementForm
//                         useFormProps={{
//                             id,
//                             resource: "users",
//                             meta: {
//                                 gqlMutation: ACCOUNT_SETTINGS_UPDATE_USER_MUTATION,
//                             },
//                         }}
//                         formProps={{initialValues: {jobTitle}}}
//                         icon={<IdcardOutlined className="tertiary"/>}
//                         state={getActiveForm("jobTitle")}
//                         itemProps={{
//                             name: "jobTitle",
//                             label: "Chức vụ",
//                         }}
//                         view={<Text>{jobTitle}</Text>}
//                         onClick={() => setActiveForm("jobTitle")}
//                         onUpdate={() => setActiveForm(undefined)}
//                         onCancel={() => setActiveForm(undefined)}
//                     >
//                         <Input/>
//                     </SingleElementForm>
//                     <SingleElementForm
//                         useFormProps={{
//                             id,
//                             resource: "users",
//                             meta: {
//                                 gqlMutation: ACCOUNT_SETTINGS_UPDATE_USER_MUTATION,
//                             },
//                         }}
//                         formProps={{initialValues: {phone}}}
//                         icon={<PhoneOutlined className="tertiary"/>}
//                         state={getActiveForm("phone")}
//                         itemProps={{
//                             name: "phone",
//                             label: "Điện thoại",
//                         }}
//                         view={<Text>{phone}</Text>}
//                         onClick={() => setActiveForm("phone")}
//                         onUpdate={() => setActiveForm(undefined)}
//                         onCancel={() => setActiveForm(undefined)}
//                     >
//                         <Input/>
//                     </SingleElementForm>
//                     {/* <SingleElementForm
// 						useFormProps={{
// 							id,
// 							resource: "users",
// 							meta: {
// 								gqlMutation: ACCOUNT_SETTINGS_UPDATE_USER_MUTATION,
// 							},
// 						}}
// 						formProps={{ initialValues: { timezone } }}
// 						style={{ borderBottom: "none" }}
// 						icon={<GlobalOutlined className="tertiary" />}
// 						state={getActiveForm("timezone")}
// 						itemProps={{
// 							name: "timezone",
// 							label: "TimezoneEnum",
// 						}}
// 						view={<Text>{timezone}</Text>}
// 						onClick={() => setActiveForm("timezone")}
// 						onUpdate={() => setActiveForm(undefined)}
// 						onCancel={() => setActiveForm(undefined)}
// 					>
// 						<Select style={{ width: "100%" }} options={timezoneOptions} />
// 					</SingleElementForm> */}
//                 </Card>
//                 <Card
//                     title={
//                         <Space size={15}>
//                             <SafetyCertificateOutlined/>
//                             <Text size="sm">Bảo mật</Text>
//                         </Space>
//                     }
//                     styles={{
//                         header: {padding: "0 12px"},
//                         body: {
//                             padding: "0",
//                         },
//                     }}
//                 >
//                     <SingleElementForm
//                         useFormProps={{
//                             id,
//                             resource: "users",
//                             meta: {
//                                 gqlMutation: ACCOUNT_SETTINGS_UPDATE_USER_MUTATION,
//                             },
//                         }}
//                         formProps={{initialValues: {email}}}
//                         icon={<MailOutlined className="tertiary"/>}
//                         state={"viewOnly"}
//                         itemProps={{
//                             name: "email",
//                             label: "Email",
//                         }}
//                         view={<Text disabled>{email}</Text>}
//                     />
//
//                     <SingleElementForm
//                         formProps={{initialValues: {password: "*********"}}}
//                         icon={<SecurityScanOutlined className="tertiary"/>}
//                         state={"view"}
//                         itemProps={{
//                             name: "changePassword",
//                             label: "Đổi mật khẩu",
//                         }}
//                         view={<Text>{"********"}</Text>}
//                         onClick={() => setOpenChangePwd(true)}
//                         onUpdate={() => setActiveForm(undefined)}
//                         onCancel={() => setActiveForm(undefined)}
//                     />
//
//                     <ChangePasswordModal
//                         opened={openChangePwd}
//                         setOpened={setOpenChangePwd}
//                         userId={id}
//                     />
//                 </Card>
//             </div>
//         </Drawer>
//     );
// };
