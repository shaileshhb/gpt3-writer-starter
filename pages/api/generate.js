import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
})

const openAI = new OpenAIApi(configuration)

const basePromptPrefix = `Generate at least 10 MCQ questions with 2-4 options and right answer.
Topic: `

const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openAI.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.6,
    max_tokens: 500,
  })

  const basePromptOutput = baseCompletion.data.choices.pop()

  res.status(200).json({ output: basePromptOutput })
}

export default generateAction;