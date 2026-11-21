export default class ResultTabsStore {
	private _activeTab: ActiveTab = $state('results');
	activeTab = $derived(this._activeTab);

	resetTab() {
		this._activeTab = 'results'
	}

	changeTab(newTab: ActiveTab) {
		this._activeTab = newTab;
	}

}