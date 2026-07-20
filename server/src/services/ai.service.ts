import { GoogleGenerativeAI } from "@google/generative-ai";

function getModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key is not configured. Set the GEMINI_API_KEY environment variable.");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
}

const SYSTEM_PROMPT = `You are VoyageAI, an expert AI travel assistant. You help users plan trips, discover destinations, create itineraries, and provide travel advice. You are knowledgeable about world destinations, cultures, cuisines, budgets, and travel tips. Be friendly, helpful, and provide detailed, actionable advice. Use emojis sparingly to make responses engaging.`;

async function generate(systemPrompt: string, userPrompt: string): Promise<string> {
  const m = getModel();
  const prompt = `${systemPrompt}\n\n${userPrompt}`;
  const result = await m.generateContent(prompt);
  return result.response.text() || "I'm sorry, I couldn't generate a response.";
}

export const chatWithAI = async (
  messages: { role: "user" | "assistant" | "system"; content: string }[],
  context?: string
): Promise<string> => {
  const systemMessage = context
    ? `${SYSTEM_PROMPT}\n\nAdditional context: ${context}`
    : SYSTEM_PROMPT;

  const m = getModel();
  const history = messages.slice(0, -1).map((msg) => ({
    role: msg.role === "assistant" ? ("model" as const) : ("user" as const),
    parts: [{ text: msg.content }],
  }));

  const chat = m.startChat({
    history: [
      { role: "user", parts: [{ text: systemMessage }] },
      { role: "model", parts: [{ text: "Understood. I'm VoyageAI, ready to help with travel planning." }] },
      ...history,
    ],
  });

  const lastMessage = messages[messages.length - 1];
  const result = await chat.sendMessage(lastMessage.content);
  return result.response.text() || "I'm sorry, I couldn't generate a response.";
};

export const generateItinerary = async (
  destination: string,
  startDate: string,
  endDate: string,
  budget: number,
  travelers: number,
  preferences: string[]
): Promise<string> => {
  const prompt = `Create a detailed day-by-day travel itinerary for:
- Destination: ${destination}
- Dates: ${startDate} to ${endDate}
- Budget: $${budget} total
- Number of travelers: ${travelers}
- Preferences: ${preferences.join(", ") || "General sightseeing"}

For each day, provide:
- A theme/focus for the day
- Morning, afternoon, and evening activities
- Specific locations and restaurants
- Estimated costs
- Tips and recommendations

Make the itinerary practical, well-paced, and include a mix of popular attractions and hidden gems. Format the response in clear markdown with headers for each day.`;

  return generate(SYSTEM_PROMPT, prompt);
};

export const generateContent = async (
  type: string,
  topic: string,
  length: string,
  tone: string
): Promise<string> => {
  const prompt = `Generate a ${length} ${tone}-tone ${type} about: ${topic}

Requirements:
- Engaging and well-structured content
- Include relevant details and practical information
- Use appropriate headings and sections
- Make it informative yet enjoyable to read

Format the response in clean markdown.`;

  return generate(SYSTEM_PROMPT, prompt);
};

export const getRecommendations = async (
  preferences: string[],
  budget: string,
  travelStyle: string,
  pastDestinations: string[]
): Promise<string> => {
  const prompt = `Based on these user preferences, recommend 5 travel destinations:

Preferences: ${preferences.join(", ") || "Various"}
Budget level: ${budget}
Travel style: ${travelStyle}
Previously visited: ${pastDestinations.join(", ") || "None"}

For each recommendation, provide:
1. Destination name and country
2. Why it matches their preferences
3. Best time to visit
4. Estimated daily budget
5. Top 3 must-do activities
6. A unique selling point

Format as a numbered list with clear sections for each destination.`;

  return generate(SYSTEM_PROMPT, prompt);
};

export const analyzeTravelData = async (data: string): Promise<string> => {
  const prompt = `Analyze this travel data and provide insights:

${data}

Please provide:
1. Key trends and patterns
2. Spending breakdown analysis
3. Recommendations for cost optimization
4. Popular categories and destinations
5. Seasonal patterns if applicable
6. Actionable insights to improve travel planning

Format as a clear analytical report with sections and bullet points.`;

  return generate("You are a travel data analyst AI. Provide clear, data-driven insights.", prompt);
};

export const generateDestinationDescription = async (
  title: string,
  location: string,
  category: string,
  highlights: string[]
): Promise<{ description: string; shortDescription: string }> => {
  const prompt = `Generate a compelling travel destination listing for:
- Name: ${title}
- Location: ${location}
- Category: ${category}
- Highlights: ${highlights.join(", ")}

Provide:
1. A detailed description (3-4 paragraphs) that is engaging, informative, and inspires wanderlust. Include practical details about what makes this destination special.
2. A short description (1-2 sentences) that captures the essence of the destination.

Return the response in this exact JSON format:
{"description": "your detailed description here", "shortDescription": "your short description here"}`;

  const content = await generate("You are a travel content writer. Generate compelling destination descriptions.", prompt);

  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch {
    // fallback
  }

  return {
    description: content,
    shortDescription: content.substring(0, 200) + "...",
  };
};
