import { generateText } from "ai"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { elementId, elementType, context } = await req.json()

    const prompt = `당신은 UI/UX 전문가입니다. 다음 정보를 바탕으로 이 요소에 적합한 한국어 라벨을 생성해주세요:

요소 ID: ${elementId}
요소 타입: ${elementType}
컨텍스트: ${JSON.stringify(context, null, 2)}

라벨은 다음 조건을 만족해야 합니다:
1. 간결하고 명확해야 함 (2-4단어)
2. 사용자 행동을 명확히 설명
3. 일관된 네이밍 규칙 사용
4. 분석하기 쉬운 형태

JSON 형식으로 응답해주세요:
{
  "label": "추천 라벨",
  "category": "카테고리 (navigation/action/form/content)",
  "description": "라벨 선택 이유"
}`

    const { text } = await generateText({
      model: "openai/gpt-5",
      prompt,
      maxOutputTokens: 500,
      temperature: 0.5,
    })

    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0])
      return NextResponse.json(result)
    }

    return NextResponse.json({
      label: elementId,
      category: "unknown",
      description: "Failed to generate label",
    })
  } catch (error) {
    console.error("Error generating label:", error)
    return NextResponse.json({ error: "Failed to generate label" }, { status: 500 })
  }
}
