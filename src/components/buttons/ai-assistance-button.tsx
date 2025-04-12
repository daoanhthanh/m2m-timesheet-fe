import React, { useState } from "react";
import {
  Button,
  Input,
  Tooltip,
  Spin,
  Typography,
  Collapse,
  Popover,
} from "antd";
import { Sparkles, Loader } from "lucide-react";
import { useFormBuilder } from "@/hooks";
import { FormBlockInstance } from "@/types";
import { useNotification } from "@refinedev/core";
import { endpoints } from "@/utils/endpoints";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;
const { Text } = Typography;

export const AIAssistanceBtn = () => {
  const { formData, setBlockLayouts } = useFormBuilder();
  const [userRequest, setUserRequest] = useState("");
  const [loading, setLoading] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const isPublished = formData?.published;

  const { t } = useTranslation();

  const { open } = useNotification();

  const GenerateFormQuestionsWithAI = async () => {
    if (!userRequest) {
      open?.({
        type: "error",
        message: t("errors.enterRequest"),
      });
      return;
    }
    try {
      setLoading(true);

      const responseText = await fetch(endpoints.askAI, {
        method: "POST",
        credentials: "include",
        body: userRequest,
        headers: {
          "Content-Type": "text/plain",
        },
      });

      const resData = await responseText.json();

      const parsedResponse = JSON?.parse(resData.data);
      const actionType = parsedResponse.actionType;
      const generatedBlocks = parsedResponse.blocks;
      const addUniqueIdToGeneratedBlocks = addUniqueIds(generatedBlocks);

      setBlockLayouts((prevBlocks) => {
        if (actionType === "addQuestions") {
          return [...prevBlocks, ...addUniqueIdToGeneratedBlocks];
        } else if (actionType === "createForm") {
          return [...addUniqueIdToGeneratedBlocks];
        } else {
          console.warn(`Unhandled actionType: ${actionType}`);
          return prevBlocks;
        }
      });
      setPopoverVisible(false);
      setUserRequest("");
    } catch (error) {
      console.log(error, "error");
      open?.({
        type: "error",
        message: t("errors.generateFailed"),
      });
    } finally {
      setLoading(false);
    }
  };

  function addUniqueIds(blocks: FormBlockInstance[]) {
    // blocks.forEach((block) => {
    //   block.id = generateUniqueId();
    //   block?.childblocks?.forEach((child) => {
    //     child.id = generateUniqueId();
    //   });
    return blocks;
  }

  const popoverContent = (
    <div style={{ width: "300px" }}>
      <TextArea
        value={userRequest}
        rows={4}
        readOnly={isPublished}
        placeholder={t("forms.builder.sidebar.askAI.contentPlaceHolder")}
        onChange={(e) => setUserRequest(e.target.value)}
        style={{ marginBottom: "16px" }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          type="secondary"
          onClick={() => setShowTips(!showTips)}
          style={{ cursor: "pointer" }}
        >
          {showTips
            ? t("forms.builder.sidebar.askAI.tips.hide")
            : t("forms.builder.sidebar.askAI.tips.show")}
        </Text>
        <Button
          type="primary"
          onClick={GenerateFormQuestionsWithAI}
          disabled={loading || isPublished}
          icon={<Sparkles size={18} />}
        >
          {t("forms.builder.sidebar.askAI.generate")}
          {loading && (
            <Spin indicator={<Loader size="15px" className="animate-spin" />} />
          )}
        </Button>
      </div>
      {showTips && (
        <Collapse
          bordered={false}
          style={{
            marginTop: "16px",
            border: "1px solid #d9d9d9",
            borderRadius: "var(--ant-border-radius)",
            padding: "16px",
          }}
        >
          <p className="font-bold">
            {t("forms.builder.sidebar.askAI.tips.title")}
          </p>

          <ul className="pl-4 list-disc space-y-2">
            <li>{t("forms.builder.sidebar.askAI.tips.1")}</li>
            <li>{t("forms.builder.sidebar.askAI.tips.2")}</li>
            <li>{t("forms.builder.sidebar.askAI.tips.3")}</li>
            <li>{t("forms.builder.sidebar.askAI.tips.4")}</li>
          </ul>
        </Collapse>
      )}
    </div>
  );

  return (
    <>
      <Tooltip title="AI Assistance">
        <Popover
          content={popoverContent}
          placement="rightTop"
          title={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text>{t("forms.builder.sidebar.askAI.title")}</Text>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {t("forms.builder.sidebar.askAI.beta")}
              </Text>
            </div>
          }
          trigger="click"
          open={popoverVisible}
          onOpenChange={setPopoverVisible}
          styles={{
            root: {
              borderRadius: "var(--ant-border-radius)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.25)",
            },
          }}
        >
          <Button
            type={loading ? "default" : "primary"}
            style={{
              border: "none",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            {loading ? (
              <Spin
                indicator={<Loader size="15px" className="animate-spin" />}
              />
            ) : (
              <Sparkles size={18} />
            )}
          </Button>
        </Popover>
      </Tooltip>
    </>
  );
};
