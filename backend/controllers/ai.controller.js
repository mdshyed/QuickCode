import { chatSession, GenAiCode } from "../configs/AiModel.js";
import Prompt from "../data/Prompt.js";

// Rate limiting helper
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const aiChatGen = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({
        message: "Prompt is required",
        success: false,
      });
    }

    const resp = await chatSession.sendMessage(prompt + Prompt.CHAT_PROMPT);
    const result = resp.response.text();
    return res.status(200).json({
      message: "Ai chat response",
      success: true,
      result,
    });
  } catch (error) {
    console.log("Gemini chat response error: ", error);

    // Handle rate limiting
    if (error.status === 429) {
      return res.status(429).json({
        message: "Rate limit exceeded. Please try again in a few moments.",
        success: false,
        geminiError: true,
        rateLimited: true,
      });
    }

    return res.status(503).json({
      message: "Gemini chat response error",
      success: false,
      geminiError: true,
      error: error.message,
    });
  }
};

export const aiCodeGen = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({
        message: "Prompt is required",
        success: false,
      });
    }

    const resp = await GenAiCode.sendMessage(prompt + Prompt.CODE_GEN_PROMPT);
    const result = resp.response.text();

    // Sanitize the string by removing control characters before parsing
    const sanitizedResult = result.replace(/[\x00-\x1F\x7F-\x9F]/g, "");

    let parsedResult;
    try {
      parsedResult = JSON.parse(sanitizedResult);
    } catch (parseError) {
      console.log("JSON parse error:", parseError);
      console.log("Sanitized result:", sanitizedResult);
      return res.status(500).json({
        message: "Failed to parse AI response",
        success: false,
        parseError: true,
        rawResult: sanitizedResult.substring(0, 1000), // First 1000 chars for debugging
      });
    }

    return res.status(200).json({
      message: "Ai code response",
      success: true,
      result: parsedResult,
    });
  } catch (error) {
    console.log("Gemini code response error: ", error);

    // Handle rate limiting
    if (error.status === 429) {
      return res.status(429).json({
        message: "Rate limit exceeded. Please try again in a few moments.",
        success: false,
        geminiError: true,
        rateLimited: true,
      });
    }

    return res.status(503).json({
      message: "Gemini code response error",
      success: false,
      geminiError: true,
      error: error.message,
    });
  }
};

export const aiPromptEnhance = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({
        message: "Prompt is required",
        success: false,
      });
    }

    const resp = await chatSession.sendMessage(prompt + Prompt.ENHANCE_PROMPT);
    const result = resp.response.text();

    return res.status(200).json({
      message: "Ai prompt enhance response",
      success: true,
      result,
    });
  } catch (error) {
    console.log("Gemini prompt enhance response error: ", error);

    // Handle rate limiting
    if (error.status === 429) {
      return res.status(429).json({
        message: "Rate limit exceeded. Please try again in a few moments.",
        success: false,
        geminiError: true,
        rateLimited: true,
      });
    }

    return res.status(503).json({
      message: "Gemini prompt enhance response error",
      success: false,
      geminiError: true,
      error: error.message,
    });
  }
};
