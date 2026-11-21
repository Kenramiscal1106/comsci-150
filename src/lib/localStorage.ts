export function saveHistoryToLocalStorage(optimizationRecord: OptimizationRecord) {
	const lsSavedHistory = localStorage.getItem("optimization-history")
	console.log(optimizationRecord)
	if (!lsSavedHistory) {
		localStorage.setItem("optimization-history", JSON.stringify([optimizationRecord]))
		return;
	}
	const parsedHistory = JSON.parse(lsSavedHistory) as OptimizationRecord[];
	parsedHistory.unshift(optimizationRecord);
	localStorage.setItem("optimization-history", JSON.stringify(parsedHistory));
}

export function retrieveOptimizationHistory():OptimizationRecord[] {
	const lsSavedHistory = localStorage.getItem("optimization-history")
	if (!lsSavedHistory) return []
	return JSON.parse(lsSavedHistory) as OptimizationRecord[];
}