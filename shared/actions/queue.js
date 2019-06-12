
const QUEUE_TYPES = {
	RECEIVE_QUEUE: 'RECEIVE_QUEUE'
}

const receiveQueue = (queue) => ({
	type: QUEUE_TYPES.RECEIVE_QUEUE,
	queue
})


module.exports = {
	QUEUE_TYPES,
	receiveQueue
}
