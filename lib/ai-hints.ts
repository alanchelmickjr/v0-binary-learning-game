export async function getAIHint(binary: string, answer: string): Promise<string> {
  try {
    const COHERE_API_KEY = "FeKSBX3hp2iFo3k4hvKtfydEzlX3BJarJ0ZpqcOg"

    // Create a more structured prompt for Cohere
    const prompt = `You are a helpful binary teaching assistant. I need a hint for decoding binary.

Binary: ${binary}
Correct answer: ${answer}

Give a helpful hint that guides the user toward the answer without directly revealing it. Make the hint educational and fun. Keep it under 100 words.

Hint:`

    const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${COHERE_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        model: "command",
        prompt: prompt,
        max_tokens: 150,
        temperature: 0.7,
        k: 0,
        stop_sequences: [],
        return_likelihoods: "NONE",
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("Cohere API error details:", errorData)
      throw new Error(`Cohere API error: ${response.status}`)
    }

    const data = await response.json()

    // Check if the expected response structure exists
    if (!data.generations || !data.generations[0]) {
      throw new Error("Unexpected response format from Cohere API")
    }

    // Return the full hint text without truncation
    return data.generations[0].text.trim()
  } catch (error) {
    console.error("Error getting AI hint:", error)

    // Provide a fallback hint based on the binary and answer
    const fallbackHints = [
      `Look at each 8-bit group separately. Each represents a single character.`,
      `Remember that uppercase and lowercase letters have different binary codes.`,
      `The ASCII code for 'A' starts at 65 (01000001 in binary).`,
      `Try converting the first character and see if you can spot a pattern.`,
      `Count the number of 8-bit groups - that's how many characters are in the answer.`,
    ]

    // Choose a relevant fallback hint
    let fallbackHint = fallbackHints[Math.floor(Math.random() * fallbackHints.length)]

    // Add some specificity based on the answer length
    if (answer.length > 1) {
      fallbackHint += ` This binary translates to a ${answer.length}-letter word.`
    }

    return fallbackHint
  }
}
