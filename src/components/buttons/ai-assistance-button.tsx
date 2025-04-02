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
import {BaseResponse, Form, FormBlockInstance} from "@/types";
import {useNotification} from "@refinedev/core";
import { useCustom } from "@refinedev/core";
import {LeaveRequest} from "@/types/calendar";
import { withBody } from "@/providers/http/request";
import {endpoints} from "@/providers/endpoints";

const { TextArea } = Input;
const { Text } = Typography;

export const AIAssistanceBtn = () => {
  const { formData, blockLayouts, setBlockLayouts } = useFormBuilder();
  const [userRequest, setUserRequest] = useState("");
  const [loading, setLoading] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const isPublished = formData?.published;
  
  const {open} = useNotification();

  const GenerateFormQuestionsWithAI = async () => {
    if (!userRequest) {
      open?.({
        type: "error",
        message: "Please enter a request",
      });
      return;
    }
    try {
      setLoading(true);
      
      const responseText = await withBody<String,  BaseResponse<string>>(
          "POST",
          endpoints.askAI,
          userRequest,
          {
            headers: {
              "Content-Type": "text/plain"
            }
          }
          
      )
      
      console.log("responseText", JSON.stringify(responseText.data().data!));
      
      const parsedResponse = JSON?.parse(responseText.data().data!);
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
        message: "Failed to generate summary",
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
        placeholder="Describe the form or questions you want to generate with AI..."
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
          {showTips ? "Hide tips" : "Tips"}
        </Text>
        <Button
          type="primary"
          onClick={GenerateFormQuestionsWithAI}
          disabled={loading || isPublished}
          icon={<Sparkles size={18} />}
        >
          Generate
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
          <p className="font-bold">Let the AI know:</p>

          <ul className="pl-4 list-disc space-y-2">
            <li>
              What form you want it to create (e.g., a booking form for a
              hotel)?
            </li>
            <li>
              What information you'd like to collect (e.g., email, name,
              description)?
            </li>
            <li>
              What tone you'd like the questions in (e.g., formal, informal)?
            </li>
            <li>How many questions do you want to ask?</li>
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
              <Text>Ask to generate form or questions</Text>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                Beta
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
            type="primary"
            style={{
              border: "none",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Sparkles size={18} />
          </Button>
        </Popover>
      </Tooltip>
    </>
  );
};
