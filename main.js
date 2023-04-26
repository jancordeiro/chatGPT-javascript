const apiKey = "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"

function sendMessage(){
	
	var message = document.getElementById('message-input')
	if(!message.value)
	{
		message.style.border = '1px solid red'
		return
	}
	
	message.style.border = 'none'
	
	var status = document.getElementById('status')
	var btnSubmit = document.getElementById('btn-submit')
	
	status.style.display = 'block'
	status.innerHTML = 'Loading...'
	btnSubmit.disabled = true
	btnSubmit.style.cursor = 'not-allowed'
	message.disabled = true
	
	fetch("https://api.openai.com/v1/completions",{
		method: 'POST',
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "text-davinci-003",
			prompt: message.value,
			max_tokens: 2048,
			temperature: 0.5
		})
	})
	.then((response) => response.json())
	.then((response) => {
		let r = response.choices[0]['text']
		status.style.display = 'none'
		showHistory(message.value,r)
	})
	.catch((e) => {
		console.log('Error -> ',e)
	})
	.finally(() => {
		btnSubmit.disabled = false
		btnSubmit.style.cursor = 'pointer'
		message.disabled = false
	})
}

function showHistory(message,response){
	var chatHistory = document.getElementById('chat-history')
	
	// My messages
	var boxMyMessage = document.createElement('div')	
	boxMyMessage.className = 'box-my-message'
	
	var myMessage = document.createElement('p')
	myMessage.className = 'my-message'
	myMessage.innerHTML = message
	
	boxMyMessage.appendChild(myMessage)
	chatHistory.appendChild(boxMyMessage)
	
	// Response messages
	var boxResponseMessage = document.createElement('div')	
	boxResponseMessage.className = 'box-response-message'
	
	var chatResponse = document.createElement('p')
	chatResponse.className = 'chat-message'
	chatResponse.innerHTML = response
	
	boxResponseMessage.appendChild(chatResponse)
	chatHistory.appendChild(boxResponseMessage)
	
	// Scroll to the end
	chatHistory.scrollTop = chatHistory.scrollHeight
}