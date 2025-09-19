import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import axios from "axios";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;

app.post("/api/analyze", async (req, res) => {
  console.log("Received request:", req.body);
  const { userResponses } = req.body;
  if (!userResponses) {
    return res.status(400).json({ error: "User responses are required" });
  }

  try {
    // Format the prompt with user responses
    const prompt = `Based on the following responses to career assessment questions, provide career advice and suggestions:
      ${JSON.stringify(userResponses, null, 2)}
      Please analyze these responses and provide:
      1. Top 3 recommended career paths
      2. Key strengths identified
      3. Areas for development
      4. Suggested next steps for career growth`;

    console.log("Making request to Azure OpenAI with endpoint:", endpoint);
    const response = await axios.post(
      `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=2024-02-15-preview`,
      {
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1024,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      }
    );

    console.log("Azure OpenAI response:", response.data);
    const analysis = response.data.choices[0]?.message?.content;

    if (!analysis) {
      console.log("No analysis returned from Azure OpenAI, using mock data");
      const mockAnalysis = `Based on your responses, here's a career analysis:

1. Top 3 recommended career paths:
   - Software Development Engineer
   - Technical Project Manager
   - Solution Architect

2. Key strengths identified:
   - Strong problem-solving abilities
   - Technical proficiency in programming
   - Excellent communication skills
   - Team collaboration mindset
   - Innovation-driven approach

3. Areas for development:
   - Consider expanding knowledge in cloud technologies
   - Further develop leadership skills
   - Enhance domain-specific expertise

4. Suggested next steps for career growth:
   - Pursue relevant certifications in your field
   - Join professional networks and communities
   - Take on leadership roles in team projects
   - Stay updated with industry trends
   - Build a portfolio of practical projects`;

      res.json({ analysis: mockAnalysis });
      return;
    }

    res.json({ analysis });
  } catch (err) {
    console.error("Error:", err.response ? err.response.data : err);
    console.log("Error occurred, returning mock data");

    const mockAnalysis = `Based on your responses, here's a career analysis:

1. Top 3 recommended career paths:
   - Software Development Engineer
   - Technical Project Manager
   - Solution Architect

2. Key strengths identified:
   - Strong problem-solving abilities
   - Technical proficiency in programming
   - Excellent communication skills
   - Team collaboration mindset
   - Innovation-driven approach

3. Areas for development:
   - Consider expanding knowledge in cloud technologies
   - Further develop leadership skills
   - Enhance domain-specific expertise

4. Suggested next steps for career growth:
   - Pursue relevant certifications in your field
   - Join professional networks and communities
   - Take on leadership roles in team projects
   - Stay updated with industry trends
   - Build a portfolio of practical projects`;

    res.json({
      analysis: mockAnalysis,
      isError: true,
      error: "An error occurred while processing your request, showing mock data",
      details: err.response ? err.response.data : String(err),
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
