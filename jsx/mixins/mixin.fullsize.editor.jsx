define(function () {
  
	const CLASS_WIDTH_SM_FULL = 'animation col-xs-12 col-sm-12';
	const CLASS_WIDTH_SM_HALF = 'animation col-xs-12 col-sm-6';
	const CLASS_HIDDEN = 'animation animation-delay col-xs-12 col-sm-1 hidden-md hidden-lg';

	return {

		getInitialState: function () {
			return {
				editorWidth: CLASS_WIDTH_SM_HALF, detailsWidth: CLASS_WIDTH_SM_HALF
			}
		},

		getEditorWidthClass: function () {
			return this.state.editorWidth;
		},

		getDetailWidthClass: function () {
			return this.state.detailsWidth;
		},

		isEditorFullSized: function () {
			return this.state.detailsWidth === CLASS_HIDDEN;
		},


		toggleEditorSize: function () {

			if (this.isEditorFullSized()) {
				this.setState({editorWidth: CLASS_WIDTH_SM_HALF, detailsWidth: CLASS_WIDTH_SM_HALF});
			}
			else {
				this.setState({editorWidth: CLASS_WIDTH_SM_FULL, detailsWidth: CLASS_HIDDEN});
			}
		}


	};
});