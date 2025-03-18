async function getAnswer(params: GeminiApiRecieverProps): Promise<GeminiApiResponseProps> {
    const response = await fetch('/api/gemini',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    console.log(response.status)
    if(!response.ok){
        throw new Error('Cant get answer')
    }

    return await response.json()
}

export default getAnswer
