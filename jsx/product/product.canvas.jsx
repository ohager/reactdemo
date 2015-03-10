define(['react', 
        'restservice/generic.service',
		'component/cardscontrol',
		'component/editor.frame',
		'component/product/product.editor',
		'component/card.list',
		'component/product/product.card',
		'component/more.button',
		'component/details/details.list',
        'component/mixins/mixin.fullsize.editor',
		'component/mixins/mixin.actionprovider'
       ],

	function (React, GenericService, CardsControl, EditorFrame, ProductEditor, CardList, ProductCard, MoreButton, DetailsList, MixinFullSizeEditor, MixinActionProvider) {
      
        
       var ProductCanvas = React.createClass({
        
       mixins: [MixinFullSizeEditor, MixinActionProvider],

       getInitialState: function () {
          return {	}
        },
          
		createProductCardClass : function(){
			return ProductCard; // todo: make more consistent
		},         
      
      
		render: function () {
         
			return (
				<div className="row">
					<div className={this.getEditorWidthClass()}>
						<div className="panel panel-default">

							<div className="panel-body">
								<section className="section-search">
									<CardsControl editorId="slider" className="animation"  onToggle={this.toggleEditorSize}  />
								</section>

								<section className="section-add-item ">
									<div id="slider" className="animation">
										<EditorFrame>
											<ProductEditor/>
										</EditorFrame>
									</div>
								</section>

								<section className="section-container-cards">
									<CardList cardContentClass={this.createProductCardClass()} restService={new GenericService('/produto')} cardItemClass='card-item'/>
								</section>
							</div>

							<div className="panel-footer clearfix">
								<MoreButton text="Carregar"/>
							</div>

						</div>
					</div>
					<div className={this.getDetailWidthClass()}>
						<div className="row">
							<div className="col-xs-12 col-sm-12">
								<section className="section-details">
									<DetailsList actions = {this.ActionProvider.getActions()}/>
								</section>
							</div>
						</div>
					</div>
				</div>
			)
		}
	});

	return ProductCanvas;

});
