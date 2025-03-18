async function getAnswer({userStory, userTones}: {userStory:string, userTones:string[]}) {
    const response = await fetch('/api/gemini',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            story: userStory,
            tones: userTones
        })
    })
    console.log(response.status)
    if(!response.ok){
        throw new Error('Cant get answer')
    }

    return await response.json()
}

export default getAnswer
