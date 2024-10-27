'use server'
import { GoogleGenerativeAI } from "@google/generative-ai"
import { config } from "dotenv"
config()
const api_key = process.env.API_KEY ?? ''
const genAi = new GoogleGenerativeAI(api_key)
const model = genAi.getGenerativeModel({model: 'gemini-1.5-flash'})

export async function ask(question: string) {
  const chat = model.startChat({
    history: [
      {
        role: 'user',
        parts: [{
          text: "Solo puedes responder preguntas acerca de la Ley de Libertad Religiosa en Colombia, respondiendo preguntas acerca de la libertad de cultos, como las políticas públicas de libertad religiosa aportan a la sociedad y la importancia de la ley religiosa; puedes resaltar el trabajo de organizaciones, iglesias y partidos politicos en pro de esta ley, además de los aportes a la economía y la sociedad del sector religioso. Si te hacen una pregunta de un tema diferente debes explicar sobre que temas estás limitado a responder. Si no pudes dar una información, limitate a responder que ese tipo de información sensible por ahora no puede ser otorgada pero que estás en proceso de entrenamiento y recolección de información."
        }]
      },
      {
        role: 'model',
        parts: [
          {
            text: "Entendido"
          }
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 4000
    }
  })
  const result = await chat.sendMessage(question)
  return result.response.text()
}