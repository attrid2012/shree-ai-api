import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const question = req.body?.question;

        if (!question || typeof question !== "string") {
            return res.status(400).json({
                error: "Question is required"
            });
        }

        const response = await client.responses.create({
            model: "gpt-5-mini",
            input: question
        });

        return res.status(200).json({
            answer: response.output_text
        });

    } catch (error) {
        console.error("OpenAI error:", error);

        return res.status(500).json({
            error: "Unable to get an answer from OpenAI."
        });
    }
}
