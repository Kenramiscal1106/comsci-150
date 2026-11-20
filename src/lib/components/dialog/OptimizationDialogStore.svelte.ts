
export default class OptimizationDialogStore {
	private _open: boolean = $state(false);
	private _stageI: number = $state(0);

	readonly open = $derived(this._open)
	readonly stageI = $derived(this._stageI);

	openDialog() {
		this._open = true;
		this._stageI = 0;
	}

	closeDialog() {
		this._open = false;
	}

	nextStage() {
		this._stageI++;
	}

	previousStage() {
		this._stageI--;
	}
}