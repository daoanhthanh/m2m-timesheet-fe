import { FC, ReactNode, useState } from "react";

import { CloudDownloadOutlined, CloudUploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Modal, Upload } from "antd";

import Index from "@/components/warning-content";

import styles from "./buttons.module.css";
import { useNotification } from "@refinedev/core";
import { get } from "@/providers/http/request";
import { endpoints } from "@/providers/endpoints";

export type FileHandleButtonProps = {
  type: "Export" | "Import";
  entity: "nhân viên";
  onSubmit: (file: File) => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
  mockedFile?: string;
  body?: ReactNode;
};

const FileHandleButton: FC<FileHandleButtonProps> = ({
  type,
  entity,
  accept,
  multiple,
  label,
  mockedFile,
  body,
}) => {
  const [openFileModal, setOpenFileModal] = useState(false);

  const { open } = useNotification();

  const showModal = () => {
    setOpenFileModal(true);
  };

  const handleCancel = () => {
    setOpenFileModal(false);
  };

  const icon =
    type === "Export" ? <CloudDownloadOutlined /> : <CloudUploadOutlined />;

  const importProps: UploadProps = {
    name: "file",
    action: "https://mockapi.io/api/upload",
    multiple: multiple,
    accept: accept,
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        open?.({
          type: "success",
          message: `File đã được tải lên thành công ${info.file.name}!`,
          description: "Thành công",
        });
      } else if (info.file.status === "error") {
        open?.({
          type: "error",
          message: `Quá trình tải lên bị lỗi: ${info.file.name}!`,
          description: "Thất bại",
        });
      }
    },
  };

  const downloadTemplate = async () => {
    await get(
      mockedFile
        ? endpoints.downloadFile(mockedFile)
        : endpoints.downloadFile("mau_file_khach_hang.xlsx"),
    );
  };

  const ImportButton = () => {
    return (
      <Button icon={icon} size={"large"}>
        {label ?? "Nhấn để nhập file"}
      </Button>
    );
  };

  const ExportButton = () => {
    return (
      <>
        <Button type="primary" size={"large"} icon={icon} onClick={showModal}>
          {label ?? "Nhấn để nhập file"}
        </Button>
        <Modal
          title={
            <>
              <h3>Nhập danh sách {entity} từ file dữ liệu</h3>
              <a className={styles.downloadTemplate} onClick={downloadTemplate}>
                Tải về file mẫu
              </a>
            </>
          }
          open={openFileModal}
          onCancel={handleCancel}
          footer={[
            <Upload {...importProps}>
              <Button
                icon={icon}
                type={"primary"}
                style={{
                  marginLeft: "8px",
                }}
              >
                Chọn file dữ liệu
              </Button>
            </Upload>,
          ]}
        >
          {body}
          <Index
            content={
              <>
                <p>
                  Hệ thống cho phép nhập tối đa 2.000 {entity} mỗi lần từ file .
                </p>
                <p>
                  Với các trường liên quan đến hình ảnh, hãy tải chúng lên hệ
                  thống hoặc đám mây (Google Drive, One Drive ...) rồi lấy link
                  hình ảnh dán vào. Hãy đảm bảo những bức ảnh đó được{" "}
                  <strong>cấp quyền truy cập công khai</strong> trong quá trình
                  nhập dữ liệu.
                </p>
              </>
            }
          />
        </Modal>
      </>
    );
  };

  return <>{type === "Export" ? <ImportButton /> : <ExportButton />}</>;
};

FileHandleButton.defaultProps = {
  accept: "*",
  multiple: false,
  label: undefined,
};

export default FileHandleButton;
